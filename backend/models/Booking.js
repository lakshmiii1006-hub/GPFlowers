const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    eventType: { type: String, required: true },
    eventDate: { type: Date, required: true },
    venue: { type: String, required: true },
    guests: { type: String, required: true },
    budget: { type: String, required: true },
    floralStyle: [String],
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
