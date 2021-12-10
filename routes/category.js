const express = require('express');
const router = express.Router();
const { 
    getAllCategories, 
    getOneCategory, 
    createCategory, 
    deleteCategory
} = require('../controllers/categoryController');


router.get("/", getAllCategories);
router.get("/category/:id", getOneCategory);
router.post("/category/", createCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
