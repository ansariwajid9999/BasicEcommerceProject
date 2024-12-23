const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const server = express();
const path = require("path");
const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

console.log("env", process.env.DB_PASSWORD);

// DB Connection
main().catch((err) => console.log(err));

async function main() {
  // await mongoose.connect('mongodb://127.0.0.1:27017/products');
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Database Connected");
}

server.use(cors());
server.use(express.json());
server.use(morgan("default"));
server.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)));
server.use("/api/products", productRouter.router);
server.use("/users", userRouter.router);
server.use("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

server.listen(process.env.PORT, () => {
  console.log("server start");
});
