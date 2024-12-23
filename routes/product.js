const express = require("express");
const router = express.Router();
const productController = require("../controller/product");

router
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  // .get("/get", productController.getProductById)
  .post("/post", productController.addProduct)
  .put("/put/:id", productController.replaceProduct)
  .patch("/patch/:id", productController.updateProduct)
  .delete("/delete/:id", productController.deleteProduct);

exports.router = router