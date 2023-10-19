import { DataSource } from "typeorm";
import dotenv from 'dotenv'
import { User } from "./entities/userdb";
import { Profile } from "./entities/Profile";
import { Role } from "./entities/Role";
import { Permission } from "./entities/Permission";
import { Article,  Content, Video } from "./entities/Content";
import { Tag } from "./entities/Tag";
import { Category } from "./entities/Category";

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
        Category,
        Video,
        Article
    ],
    migrations: ['./**/migration/*.ts'],
    synchronize: true,
    logging: false
    
});

export default dataSource;