const express = require('express');
const router = express.Router();
const { 
    getAllCategories, 
    getOneCategory, 
    createCategory, 
    deleteCategory,
    updateCategory,
    getAllCategoriesByUser,
    categoryImageUpload
} = require('../controllers/categoryController');


router.get("/", getAllCategories);
router.get("/:id",getAllCategoriesByUser)
router.get("/category/:id", getOneCategory);
router.post("/category", createCategory);
router.post("/category/imageUpload/:id", categoryImageUpload);
router.delete("/category/:id", deleteCategory);
router.put("/category/:id", updateCategory);

module.exports = router;
