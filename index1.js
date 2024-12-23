const fs = require("fs");

const index = fs.readFileSync("index.html", "utf-8");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

const express = require("express");
const morgan = require("morgan");

const server = express();

// Middleware
server.use((req, res, next) => {
  console.log(
    req.method,
    req.ip,
    req.hostname,
    new Date(),
    req.get("user-agent")
  );
  next();
});

// body parser using when calling post method to secure password in body
server.use(express.json());

// logger third party middleware
server.use(morgan("default"));

// static hosting
server.use(express.static("public"));

const auth = (req, res, next) => {
  console.log(req.query);

  //if (req.query.password == "123") {
  //Checking for the post method enable middleware => server.use(express.json()) for hiding password
  // if (req.body.password == "123") {
  //   next();
  // } else {
  //   res.sendStatus(401);
  // }

  next();
};

// Auth on all apis
//server.use(auth);

// API - Endpoint - Route

// URL parameters
server.get("/product/:id", (req, res) => {
  console.log(req.params);
  res.json({ type: "GET" });
});

// REST API CRUD

const getAllProducts = (req, res) => {
  console.log(req.params);
  res.json(products);
};
const getProductById = (req, res) => {
  const id = +req.params.id;
  const productById = products.find((p) => p.id === id);
  console.log(req.params);
  res.json(productById);
};
const addProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json(req.body);
};
const replaceProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products.splice(productIndex, 1, { ...req.body, id: id });
  res.status(201).json(req.body);
};
const updateProduct = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const currentProduct = products[productIndex];
  products.splice(productIndex, 1, { ...currentProduct, ...req.body });
  res.status(201).json(req.body);
};

server.get("/products", getAllProducts);
server.get("/products/:id", getProductById);
server.post("/post/products", addProduct);
server.put("/put/products/:id", replaceProduct);
server.patch("/patch/products/:id", updateProduct);
server.delete("/delete/products/:id", (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const currentProduct = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json(currentProduct);
});

server.get("/get", auth, (req, res) => {
  res.json({ type: "GET" });
});
server.post("/post", auth, (req, res) => {
  res.json({ type: "POST" });
});
server.put("/put", (req, res) => {
  res.json({ type: "PUT" });
});
server.delete("/delete", auth, (req, res) => {
  res.json({ type: "DELETE" });
});
server.patch("/patch", (req, res) => {
  res.json({ type: "PATCH" });
});

server.get("/", (req, res) => {
  //res.send('<h1>Hello wajid</h1>');
  //res.sendFile('/Users/91798/Frontend Projects/Express/index.html');
  //res.json(products);
  //res.sendStatus(404);
});

server.listen(3030, () => {
  console.log("server start");
});
