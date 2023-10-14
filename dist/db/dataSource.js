"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const userdb_1 = require("./entities/userdb");
const Profile_1 = require("./entities/Profile");
const Role_1 = require("./entities/Role");
const Permission_1 = require("./entities/Permission");
dotenv_1.default.config();
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        userdb_1.User,
        Profile_1.Profile,
        Role_1.Role,
        Permission_1.Permission
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
});
exports.default = dataSource;
