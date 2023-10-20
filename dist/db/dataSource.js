"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const Category_1 = require("./entities/Category");
const Content_1 = require("./entities/Content");
const Media_1 = require("./entities/Media");
const Permission_1 = require("./entities/Permission");
const Profile_1 = require("./entities/Profile");
const Role_1 = require("./entities/Role");
const Tag_1 = require("./entities/Tag");
const userdb_1 = require("./entities/userdb");
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
        Permission_1.Permission,
        Content_1.Content,
        Tag_1.Tag,
        Media_1.Media,
        Category_1.Category,
        Content_1.Video,
        Content_1.Article
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
});
exports.default = dataSource;
