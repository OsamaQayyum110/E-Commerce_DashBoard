const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);

const PORT = process.env.PORT || 3500;

app.listen(3500, () => {
  console.log(`Server Listen At ${PORT}`);
});
