const asyncHandler = require("express-async-handler");
const Product = require('../models/productModel');

const productList = asyncHandler(async (req, res) => {
    const products = await Product.find();
    if (products.length > 0) {
        res.status(200);
        res.send(products);
    } else {
        res.status(201);
        res.send("No Product");
    }
  });
const addProduct = asyncHandler(async (req, res) => {
    const { name, price, company, category, pic } = req.body;
    const product = await Product.create({
        name,
        price,
        company,
      category,
        pic,
    })
    if (product) {
        res.status(201).json({
          _id: product._id,
          name: product.name,
          price: product.price,
          company: product.company,
          category: product.category,
        });     
    } else {
        res.status(400);
        res.send("Something Went Wrong")
    }
});
// const addProduct = asyncHandler(async (req, res) => {
//   const product = new Product(req.body);
//   const result = await product.save();
//   if (result) {
//     res.status(201).json({
//       _id: result._id,
//       name: result.name,
//       price: result.price,
//       company: result.company,
//       category: result.category,
//     });
//   } else {
//     res.status(400);
//     res.send("Something Went Wrong");
//   }
// });

const updateProduct = asyncHandler(async (req, res) => {
    const result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    );
    res.status(200);
    res.send(result);
 });

const deleteProduct = asyncHandler(async (req, res) => {
    const result = await Product.deleteOne(
      { _id: req.params.id }
    );
    res.status(200);
    res.send(result);
 });

 const singleProduct = asyncHandler(async (req, res) => {
   const result = await Product.findOne({ _id: req.params.id });
    if (result) {
      res.status(200);
      res.send(result);
    } else {
      res.status(201);
      res.send("No Product");
    }
 });

 const searchProduct = asyncHandler(async (req, res) => {

     const result = await Product.find({
       $or: [
         { name: { $regex: req.params.key, $options: "i" } },
         { company: { $regex: req.params.key, $options: "i" } },
         { category: { $regex: req.params.key, $options: "i" } },
       ],
     });
     res.send(result);
 });

// const searchProduct = asyncHandler(async (req, res) => {
//     const keyword = req.params.key
//       ? {
//           $or: [
//             { name: { $regex: req.params.key, $option: "i" } },
//             { company: { $regex: req.params.key, $option: "i" } },
//             { category: { $regex: req.params.key, $option: "i" } },
//           ],
//         }
//       : {};

//     const result = await Product.find({ keyword });
//     res.send(result);
//   });


module.exports = {
  productList,
  addProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  singleProduct,
};