const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedBooks` array in User.js
const gameSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  released: {
    type: String,
  },
  background_image: {
    type: String,
  },
  rating: {
    type: Integer,
  },
  metacritic: {
    type: Integer,
  },

  // saved game id from rawg - changed bookId to gameId
  gameId: {
    type: String,
    required: true,
  },
  platform: [{
    type: String,
  }],
});

module.exports = gameSchema;
