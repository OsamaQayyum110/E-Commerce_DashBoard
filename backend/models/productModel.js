const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  company: { type: String, required: true },
  category: { type: String, required: true },
  pic: {
    type: String,
    default:
      "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  },
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;


