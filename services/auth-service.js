const utils = require("../helpers/utils");
const googleClient = require("../clients/google/index");

module.exports = {
  verifyTokenOfGoogleSSO: async (accessToken) => {
    return googleClient.verifyTokenFromGoogle(accessToken);
  },

  signUpIfUserNotExists: async (user) => {},

  generateJwtToken: async (user) => {
    return utils.createToken(user);
  },

  extractUserDetailsFromToken: async (token) => {
    return utils.verifyToken(token);
  },
};
