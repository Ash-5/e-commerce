'use strict';

const express = require("express");
const router = express.Router();
const product = require("../controllers/products");

router.get("/:id", product.getProduct);
router.post("/", product.createProduct);
router.patch("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;