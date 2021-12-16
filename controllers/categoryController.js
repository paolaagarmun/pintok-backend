const cloudinary = require('cloudinary').v2;
const Category = require('../Schemas/Category')

const getAllCategories = async (req, res) => {
    const categories = await Category.find(); 
    try {
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get categories"})
    }
}

const getAllCategoriesByUser = async (req, res) => {
    const { id } = req.params
    const categories = await Category.find({user: id}); // {user: id}
    try {
        return res.status(200).json(categories)
    } catch (error) {
        return res.status(500).json({message: "Couldn't get categories"})
    }
}

const getOneCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findById(id)
        .populate("user", "name");
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

const categoryImageUpload = async (req, res) => {
    const { id } = req.params;
    const categoryToUpdate = await Category.findById(id);

    if (categoryToUpdate.image) {
        let array = categoryToUpdate.image.split('/');
        let fileName = array[array.length-1]
        const [public_id] = fileName.split('.');
        await cloudinary.uploader.destroy(public_id);
    }

    const { tempFilePath } = req.files.image;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    categoryToUpdate.image = secure_url;
    await categoryToUpdate.save();
    try {
        return res.status(201).json(categoryToUpdate)
    } catch (error) {
        return res.status(500).json({message: "There was an error uploading the image"})
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
    updateCategory,
    getAllCategoriesByUser,
    categoryImageUpload
}