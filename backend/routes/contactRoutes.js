import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,   // your Gmail
        pass: process.env.MAIL_PASS,   // app password
      },
    });

    await transporter.sendMail({
      from: `"GP Flower Decorators" <${process.env.MAIL_USER}>`,
      to: "gpflowerdecorators@gmail.com",   // destination email
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;
