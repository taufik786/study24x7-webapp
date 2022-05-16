const express = require("express");

const router = express.Router();
const searchBoxController = require('../controllers/searchBox');

router.get('/:searchText', searchBoxController.searchBox)

module.exports = router;