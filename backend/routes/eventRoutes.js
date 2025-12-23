import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

/* ADD EVENT */
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({ message: "Event added successfully" });
  } catch (error) {
    console.error("Event error:", error);
    res.status(500).json({ message: "Failed to add event" });
  }
});
// ✅ ADD THIS to eventRoutes.js (if not there)
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});


export default router;
