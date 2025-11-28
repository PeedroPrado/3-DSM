const mongoose = require("mongoose");

const climaSchema = new mongoose.Schema({
  dataHora: {
    type: Date,
    default: Date.now
  },
  temp: {
    type: Number,
    required: true
  },
  origem: {
    type: String,
    default: "api_externa"
  }
});

module.exports = mongoose.model("Clima", climaSchema);
