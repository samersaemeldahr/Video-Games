const { Schema } = require('mongoose');

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
    type: Number,
  },
  metacritic: {
    type: Number,
  },
  id: {
    type: String,
    required: true,
  }
});

module.exports = gameSchema;
