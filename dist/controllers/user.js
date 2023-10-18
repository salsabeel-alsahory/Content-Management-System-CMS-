"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMedia = exports.updateCategory = exports.login = exports.getAllUsers = exports.getAllRoles = exports.getAllPermission = exports.getAllMedia = exports.getAllContent = exports.getAllCategories = exports.deleteMedia = exports.deleteCategory = exports.createUser = exports.createRole = exports.createPermission = exports.createMedia = exports.createContent = exports.createCategory = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const typeorm_1 = require("typeorm");
const dataSource_js_1 = __importDefault(require("../db/dataSource.js"));
const Category_js_1 = require("../db/entities/Category.js");
const Content_js_1 = require("../db/entities/Content.js");
const Media_js_1 = require("../db/entities/Media.js");
const Permission_js_1 = require("../db/entities/Permission.js");
const Role_js_1 = require("../db/entities/Role.js");
const userdb_js_1 = require("../db/entities/userdb.js");
const createUser = (payload) => {
    return dataSource_js_1.default.manager.transaction(async (transaction) => {
        try {
            const role = await Role_js_1.Role.findOneBy({ name: payload.role });
            const newUser = userdb_js_1.User.create({
                ...payload,
                roles: [role]
            });
            await transaction.save(newUser);
        }
        catch (error) {
            throw ("Something went wrong");
        }
    });
};
exports.createUser = createUser;
const createPermission = async (payload) => {
    try {
        const permission = Permission_js_1.Permission.create(payload);
        await permission.save();
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.createPermission = createPermission;
const createRole = async (payload) => {
    try {
        const role = new Role_js_1.Role();
        role.name = payload.name;
        role.permissions = await Permission_js_1.Permission.findBy({
            id: (0, typeorm_1.In)(payload.permissions)
        });
        await role.save();
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.createRole = createRole;
const login = async (email, password) => {
    try {
        const user = await userdb_js_1.User.findOneBy({
            email
        });
        if (!user) {
            return undefined;
        }
        const passwordMatching = await bcrypt_1.default.compare(password, user?.password || '');
        if (user && passwordMatching) {
            const token = jsonwebtoken_1.default.sign({
                email: user.email,
                userName: user.userName,
                displayName: user.displayName
            }, process.env.SECRET_KEY || "", {
                expiresIn: "14d"
            });
            return {
                user,
                token
            };
        }
        else {
            throw ("invalid email or password");
        }
    }
    catch (error) {
        throw ("invalid email or password");
    }
};
exports.login = login;
const getAllUsers = () => {
    try {
        const users = userdb_js_1.User.find();
        return users;
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.getAllUsers = getAllUsers;
const getAllRoles = () => {
    try {
        const roles = Role_js_1.Role.find();
        return roles;
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.getAllRoles = getAllRoles;
const getAllPermission = () => {
    try {
        const permission = Permission_js_1.Permission.find();
        return permission;
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.getAllPermission = getAllPermission;
const getAllContent = () => {
    try {
        const content = Content_js_1.Content.find();
        return content;
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.getAllContent = getAllContent;
const createContent = async (payload) => {
    try {
        // Create a new content item based on the payload
        const newContent = Content_js_1.Content.create(payload);
        // Save the new content item to the database
        await newContent.save();
        return newContent; // Return the newly created content
    }
    catch (error) {
        throw ('Failed to create content: ' + error);
    }
};
exports.createContent = createContent;
const createMedia = async (payload) => {
    try {
        const newMedia = new Media_js_1.Media();
        newMedia.name = payload.name;
        newMedia.permissions = await Permission_js_1.Permission.findBy({
            id: (0, typeorm_1.In)(payload.permissions)
        });
        await newMedia.save();
    }
    catch (error) {
        throw ("Failed to create media: " + error);
    }
};
exports.createMedia = createMedia;
const getAllMedia = async () => {
    try {
        const media = await Media_js_1.Media.find();
        return media;
    }
    catch (error) {
        throw new Error("Something went wrong");
    }
};
exports.getAllMedia = getAllMedia;
const updateMedia = async (id, payload) => {
    try {
        const mediaToUpdate = await Media_js_1.Media.findOne({ where: { id: (id) } });
        if (mediaToUpdate) {
            Object.assign(mediaToUpdate, payload);
            await mediaToUpdate.save();
            return mediaToUpdate;
        }
        else {
            throw ("Media not found");
        }
    }
    catch (error) {
        throw ("Failed to update media: " + error);
    }
};
exports.updateMedia = updateMedia;
const deleteMedia = async (id) => {
    try {
        const mediaToDelete = await Media_js_1.Media.findOne({ where: { id: (id) } });
        if (mediaToDelete) {
            await Media_js_1.Media.remove(mediaToDelete);
        }
        else {
            throw ("Media not found");
        }
    }
    catch (error) {
        throw ("Failed to delete media: " + error);
    }
};
exports.deleteMedia = deleteMedia;
// Category functions
const createCategory = async (payload) => {
    try {
        const newCategory = Category_js_1.Category.create(payload);
        await newCategory.save();
        return newCategory;
    }
    catch (error) {
        throw ("Failed to create category: " + error);
    }
};
exports.createCategory = createCategory;
const getAllCategories = () => {
    try {
        return Category_js_1.Category.find();
    }
    catch (error) {
        throw ("Something went wrong");
    }
};
exports.getAllCategories = getAllCategories;
const updateCategory = async (id, payload) => {
    try {
        const categoryToUpdate = await Category_js_1.Category.findOne({
            where: { id: Number(id) }
        });
        if (categoryToUpdate) {
            Object.assign(categoryToUpdate, payload);
            await categoryToUpdate.save();
            return categoryToUpdate;
        }
        else {
            throw ("Category not found");
        }
    }
    catch (error) {
        throw ("Failed to update category: " + error);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (id) => {
    try {
        const categoryToDelete = await Category_js_1.Category.findOne({
            where: { id: Number(id) }
        });
        if (categoryToDelete) {
            await Category_js_1.Category.remove(categoryToDelete);
        }
        else {
            throw ("Category not found");
        }
    }
    catch (error) {
        throw ("Failed to delete category: " + error);
    }
};
exports.deleteCategory = deleteCategory;
