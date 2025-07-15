const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/portfolioDB", {
  useNewUrlParser: true,
});


const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB error:"));
db.once("open", () => {
  console.log("✅ MongoDB connected!");
});

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Route
app.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error!" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

