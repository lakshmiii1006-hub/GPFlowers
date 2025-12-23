import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import testimonialRoutes from "./routes/testimonials.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import multer from 'multer';  // ✅ MOVED TO TOP
import path from 'path';
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));  // ✅ Increased limit

// ✅ IMAGE UPLOAD SETUP (CORRECT ORDER)
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

// ✅ SERVE UPLOADED IMAGES (ONCE)
app.use('/uploads', express.static('uploads'));

// ✅ UPLOAD ENDPOINT (ONCE)
app.post('/api/upload', upload.single('image'), (req, res) => {
  console.log('Image uploaded:', req.file.filename);  // ✅ DEBUG
  res.json({ filename: req.file.filename });
});

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// API routes
app.use("/api/services", serviceRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/contact", contactRoutes)
app.listen(5000, () => console.log("Server running on port 5000 ✅"));
