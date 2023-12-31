"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllRoles = exports.login = exports.getAllUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dataSource_js_1 = __importDefault(require("../db/dataSource.js"));
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
                name: user.displayName,
                email: user.email,
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
const getAllUsers = (searchTerm, roleFilter, page = 1, pageSize = 10) => {
    try {
        let queryBuilder = userdb_js_1.User.createQueryBuilder("user");
        // Search
        if (searchTerm) {
            queryBuilder = queryBuilder.where("user.displayName LIKE :searchTerm OR user.email LIKE :searchTerm", { searchTerm: `%${searchTerm}%` });
        }
        // Filter by role
        if (roleFilter) {
            queryBuilder = queryBuilder.innerJoinAndSelect("user.roles", "role", "role.name = :roleFilter", { roleFilter });
        }
        // Pagination
        const users = queryBuilder
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getMany();
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
