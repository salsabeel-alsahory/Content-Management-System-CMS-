import { Category } from "../db/entities/Category";

// Category functions
const createCategory = async (payload: Category) => {
    try {
        const newCategory = Category.create(payload);
        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw ("Failed to create category: " + error);
    }
};

const getAllCategories = () => {
    try {
        return Category.find();
    } catch (error) {
        throw ("Something went wrong");
    }
};

const updateCategory = async (id: string, payload: Category) => {
    try {
        const categoryToUpdate = await Category.findOne({
            where: {id: Number(id)}
            }
            );
        if (categoryToUpdate) {
            Object.assign(categoryToUpdate, payload);
            await categoryToUpdate.save();
            return categoryToUpdate;
        } else {
            throw ("Category not found");
        }
    } catch (error) {
        throw ("Failed to update category: " + error);
    }
};

const deleteCategory = async (id: string) => {
    try {
        const categoryToDelete = await Category.findOne({
            where: {id: Number(id)}
            }
            );
        if (categoryToDelete) {
            await Category.remove(categoryToDelete);
        } else {
            throw ("Category not found");
        }
    } catch (error) {
        throw ("Failed to delete category: " + error);
    }
};

export{deleteCategory,updateCategory,createCategory,getAllCategories}