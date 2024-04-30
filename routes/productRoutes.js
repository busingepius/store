const {getAllProducts}=require("../controllers/productControllers");
const express = require("express");
const {del} = require("express/lib/application");
const router = express.Router();

router.route("/").get(getAllProducts)

module.exports = router;