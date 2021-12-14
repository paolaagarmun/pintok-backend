const express = require('express');
const router = express.Router();
const { 
    getAllCategories, 
    getOneCategory, 
    createCategory, 
    deleteCategory,
    updateCategory,
    getAllCategoriesByUser
} = require('../controllers/categoryController');


router.get("/", getAllCategories);
router.get("/:id",getAllCategoriesByUser)
router.get("/category/:id", getOneCategory);
router.post("/category", createCategory);
router.delete("/category/:id", deleteCategory);
router.put("/category/:id", updateCategory);

module.exports = router;
