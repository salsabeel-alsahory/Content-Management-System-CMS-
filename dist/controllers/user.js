"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPermission = exports.getAllRoles = exports.createRole = exports.createPermission = exports.getAllUsers = exports.login = exports.createUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Role_js_1 = require("../db/entities/Role.js");
const Permission_js_1 = require("../db/entities/Permission.js");
const typeorm_1 = require("typeorm");
const dataSource_js_1 = __importDefault(require("../db/dataSource.js"));
const userdb_js_1 = require("../db/entities/userdb.js");
const createUser = (payload) => {
    return dataSource_js_1.default.manager.transaction(async (transaction) => {
        const role = await Role_js_1.Role.findOneBy({ name: payload.role });
        const newUser = userdb_js_1.User.create({
            ...payload,
            roles: [role]
        });
        await transaction.save(newUser);
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
    const users = userdb_js_1.User.find();
    return users;
};
exports.getAllUsers = getAllUsers;
const getAllRoles = () => {
    const roles = Role_js_1.Role.find();
    return roles;
};
exports.getAllRoles = getAllRoles;
const getAllPermission = () => {
    const permission = Permission_js_1.Permission.find();
    return permission;
};
exports.getAllPermission = getAllPermission;
