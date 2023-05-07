const mongoose = require("mongoose");
const FiveDaysLocation = new mongoose.Schema({
  latitude: {
    type: Number,
    trim: true,
    required: true,
  },
  longitude: {
    type: Number,
    trim: true,
    required: true,
  },
  busNumber: {
    type: Number,
    trim: true,
    required: true,
    default: 1,
  },
  contributor: {
    // type: String,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    trim: true,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("FiveDaysLocation", FiveDaysLocation);
