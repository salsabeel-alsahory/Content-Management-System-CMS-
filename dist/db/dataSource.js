"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Category_js_1 = require("./entities/Category.js");
const Content_js_1 = require("./entities/Content.js");
const Media_js_1 = require("./entities/Media.js");
const Tag_js_1 = require("./entities/Tag.js");
const userdb_js_1 = require("./entities/userdb.js");
console.log(process.env.DB_HOST);
const dataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.DB_HOSTNAME,
    port: 3306,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: "cms",
    entities: [
        Media_js_1.Media,
        Category_js_1.Category,
        Tag_js_1.Tag,
        Content_js_1.Content,
        userdb_js_1.User
    ],
    synchronize: true,
    logging: false
});
// export const initDB = async () =>
//   await dataSource.initialize().then(() => {
//     console.log("Connected to DB!");
//   }).catch(err => {
//     console.error('FFailed to connect to DB: ' + err);
//   });
exports.default = dataSource;
