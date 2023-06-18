'use strict';

const express = require("express");
const router = express.Router();
const variant = require("../controllers/variants.js");

router.get("/:id", variant.getVariant);
router.post("/", variant.createVariant);
router.patch("/:id", variant.updateVariant);
router.delete("/:id", variant.deleteVariant);

module.exports = router;