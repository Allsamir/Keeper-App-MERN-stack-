require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const apiRoutes = require("./routes/api");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      // "http://localhost:5173",
      "https://note-keeper-d8ef0.web.app",
      "https://note-keeper-d8ef0.firebaseapp.com",
    ],
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

mongoose
  .connect(process.env.DATABASE_URI)
  .then(console.log("Connected to Database"))
  .catch((error) => console.log(error));

app.use(apiRoutes);

app.get("/", (req, res) => {
  res.send("Server Keeper APP");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
