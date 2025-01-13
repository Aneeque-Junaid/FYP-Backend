const User = require("../models/user");

module.exports = {
  save: async (user) => {
    const isUserExists = await User.findOne({ email: user.email });

    if (isUserExists) {
      return isUserExists;
    } else {
      const userModel = new User(user);
      const newUser = await userModel.save();

      return newUser;
    }
  },
};
