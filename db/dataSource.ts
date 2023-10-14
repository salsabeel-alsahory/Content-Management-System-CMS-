import { DataSource } from "typeorm";

import { Category } from "./entities/Category.js";
import { Content } from "./entities/Content.js";
import { Media } from "./entities/Media.js";
import { Tag } from "./entities/Tag.js";
import { User } from "./entities/userdb.js";


console.log(process.env.DB_HOST);
const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOSTNAME,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database:"cms",
  entities: [
    Media,
    Category,
    Tag,
    Content,
    User
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

export default dataSource;