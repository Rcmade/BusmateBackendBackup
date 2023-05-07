const mongoose = require("mongoose");
const { Schema } = mongoose;

const contributorData = new Schema(
  {
    currentContributor: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
      ref: "User",
    },

    previousFiveContributor: [
      {
        contributor: {
          type: mongoose.Schema.Types.ObjectId,
          trim: true,
          ref: "User",
        },

        createdAt: {
          type: Date,
          required: true,
          default: Date.now,
        },
      },
    ],

    busNumber: {
      type: Number,
      trim: true,
      required: true,
      default: 1,
    },

    // expireAfterSeconds: 43200, // expires after 12 houres
  },

  { timestamps: true }
);

module.exports = mongoose.model("contributorData", contributorData);
