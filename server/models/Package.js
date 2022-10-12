const { Schema, model } = require("mongoose");

const packageSchema = new Schema(
  {
    trackingNumber: {
      type: String,
      required: true,
      unique: true,
    },
    urlToTracking: {
      type: String,
    },
    expectedDelDate: {
      type: String,
    },
    carrier: {
      type: String,
    },
    username: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Package = model("Package", packageSchema);

module.exports = Package;
