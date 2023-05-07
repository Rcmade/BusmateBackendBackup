const mongoose = require("mongoose");
const realTimeLocation = new mongoose.Schema({
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
  heading: {
    type: Number,
    trim: true,
    expires: "3m", // expires after 3 minutes
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

  ms: {
    type: Number,
    expires: "20m",
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("RealtimeLocation", realTimeLocation);
