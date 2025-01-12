const supabase = require("../config/supabaseClient");

exports.getVideoForSentence = async (req, res) => {
  try {
    const { sentence } = req.body;

    if (!sentence) {
      return res.status(400).json({ error: "Sentence is required." });
    }

    const words = sentence.split(" ").map(word => word.toLowerCase()); // Split sentence into words and convert to lowercase

    // Fetch the word and video paths from the database
    const { data, error } = await supabase
      .from("word_sign_mapping") // Your table in Supabase
      .select("*")
      .in("word", words); // Filter by words in the sentence

    if (error) {
      return res.status(500).json({ error: `Error fetching videos: ${error.message}` });
    }

    // If no matching words are found, return an empty array
    if (!data || data.length === 0) {
      return res.status(404).json({ error: "No matching words found." });
    }

    // Create a mapping of words to their video URL
    const wordToVideo = data.reduce((acc, item) => {
      acc[item.word.toLowerCase()] = item.video_url;
      return acc;
    }, {});

    // Reorder the data according to the original sentence and generate public URLs
    const updatedData = words.map((word) => {
      const video_url = wordToVideo[word] 
        ? `https://gjmdxujcynwsqpftrmrj.supabase.co/storage/v1/object/public/sign_videos/${wordToVideo[word]}`
        : null; // Construct the full public URL for the video, or null if no URL found

      return { word, video_url };
    });

    return res.status(200).json({ data: updatedData });
  } catch (err) {
    return res.status(500).json({ error: `Internal Server Error: ${err.message}` });
  }
};
