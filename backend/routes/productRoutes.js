const express = require("express");
const { productList, addProduct, updateProduct, deleteProduct, searchProduct, singleProduct } = require('../controllers/productController');
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/productList").get(protect, productList);
router.route("/addProduct").post(protect, addProduct);
router.route("/updateProduct/:id").put(protect, updateProduct);
router.route("/deleteProduct/:id").delete(protect, deleteProduct);
router.route("/singleProduct/:id").get(protect, singleProduct);
router.route("/search/:key").get(protect, searchProduct);


module.exports = router;
