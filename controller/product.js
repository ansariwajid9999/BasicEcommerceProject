const fs = require("fs");
const model = require('../model/product');
const path = require('path');
const mongoose = require('mongoose');
const { error } = require("console");

const Product = model.Product;
// const data = JSON.parse(fs.readFileSync(path.resolve(__dirname,"../data.json"), "utf-8"));
// const products = data.products;

// exports.getAllProducts = (req, res) => {
//   console.log(req.params);
//   res.json(products);
// };
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  // const products = await Product.find({id:{$gt:4}});
  res.json(products);
};
// exports.getProductById = (req, res) => {
//   const id = +req.params.id;
//   const productById = products.find((p) => p.id === id);
//   console.log(req.params);
//   res.json(productById);
// };
exports.getProductById = async (req, res) => {
  try {
    // const productById = await Product.findOne({ id: 4 });
    const productId = req.params.id;
    console.log(productId);
    
    const productById = await Product.findById(productId);
    if (!productById) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(productById);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// exports.addProduct = (req, res) => {
//   console.log(req.body);
//   products.push(req.body);
//   res.json(req.body);
// };
exports.addProduct = async (req, res) => {
  try{
    // const product = new Product({
    //   title: "phoneX",
    //   description: "This phone is Samsung Galaxy S24 Ultra.",
    //   price: 10000,
    // });

    const product = new Product(req.body);  

    const savedProduct = await product.save();
    console.log({ savedProduct });

    res.status(201).json({
      message: "Product saved successfully",
      product: savedProduct,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({err,  error: "Failed to save product" });
  }
};
// exports.replaceProduct = (req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex((p) => p.id === id);
//   products.splice(productIndex, 1, { ...req.body, id: id });
//   res.status(201).json(req.body);
// };
exports.replaceProduct = async (req, res) => {
  const id = req.params.id;
  const doc = await Product.findOneAndReplace({_id: id}, req.body);
  res.status(201).json(doc);
};
// exports.updateProduct = (req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex((p) => p.id === id);
//   const currentProduct = products[productIndex];
//   products.splice(productIndex, 1, { ...currentProduct, ...req.body });
//   res.status(201).json(req.body);
// };
// exports.deleteProduct = (req, res) => {
//   const id = +req.params.id;
//   const productIndex = products.findIndex((p) => p.id === id);
//   const currentProduct = products[productIndex];
//   products.splice(productIndex, 1);
//   res.status(201).json(currentProduct);
// };

exports.deleteProduct = async (req, res) => {  
  try{
  const id = req.params.id;
  const doc = await Product.findOneAndDelete({_id:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err);
    res.status(500).json({err, error: "failed to delete product"});
  }
};
