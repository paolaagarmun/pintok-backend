const Category = require('../Schemas/Category')

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    try {
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get categories"})
    }
}

const getOneCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id);
    try {
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get category"})
    }
}

const createCategory = async (req, res) => {
    const createdCategory = await Category.create(req.body);
    try {
        return res.status(201).json(createdCategory)
    } catch (error) {
        return res.status(500).json({message: "Couldn't create category"})
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const categoryToUpdate = await Category.findByIdAndUpdate(id, req.body, {new:true});
    try {
        return res.status(202).json(categoryToUpdate);
    } catch (error) {
        return res.status(500).json({message: "Couldn't update category"})
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    try {
        return res.status(203).json({message: "Deleted category successfully"})
    } catch (error) {
        return res.status(500).json({message: "Couldn't delete category"})
    }
}

module.exports = {
    getAllCategories,
    getOneCategory,
    createCategory,
    deleteCategory,
    updateCategory
}