const Word = require('../models/wordModel');

const addWord = async (req, res) => {
  try {
    const { word, imageUrl } = req.body;
    const lowerCaseWord = word.toLowerCase()
    const newWord = await Word.create({ word: lowerCaseWord, imageUrl });
    res.status(201).json(newWord);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getImagesForSentence = async (req, res) => {
    try {
      const { sentence } = req.body;
      const words = sentence.toLowerCase().split(' ');

      console.log("Words: ", words)
  
      const wordMappings = await Word.find({
        word: { $in: words }
      });

      console.log("Word Mapping:", wordMappings)
  
      const wordImagePairs = wordMappings.map((mapping) => ({
        word: mapping.word,
        imageUrl: mapping.imageUrl
      }));
  
      res.status(200).json({ wordImagePairs });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = {getImagesForSentence, addWord}