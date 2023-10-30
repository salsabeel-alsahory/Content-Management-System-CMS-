import dotenv from 'dotenv';
import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Article, Content, Video } from "./entities/Content";
import { Media } from "./entities/Media";
import { Permission } from "./entities/Permission";
import { Profile } from "./entities/Profile";
import { Role } from "./entities/Role";
import { Tag } from "./entities/Tag";
import { User } from "./entities/userdb";
import baseLogger from '../logger';

dotenv.config()
const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User,
        Profile,
        Role,
        Permission,
        Content,
        Tag,
        Media,
        Category,
        Video,
        Article
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
    
});
// export const initDB = async () =>
//   await dataSource.initialize().then(() => {
//     baseLogger.info("Connected to DB!");
//   }).catch(err => {
//     baseLogger.error('Failed to connect to DB: ' + err)
//   });
export default dataSource;