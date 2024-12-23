const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema
const productSchema = new Schema({
  title: {type: String, required: true},
  description: {type: String, required: true},
  category: {type: String, required: true},
  price: {type: Number, min:[0, "wrong price"], required: true},
  discountPercentage: {type: Number, min:[0, "wrong min discount"], max:[50, "wrong max discount"], required: true},
  rating: {type: Number, min:[0, "wrong min rating"], max:[5, "wrong max rating"], required: true},
  stock: {type: Number},
  tags: [{type: String, required: true}],
});

// Models
exports.Product = mongoose.model("Product", productSchema);
