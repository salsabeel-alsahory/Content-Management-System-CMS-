import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import dataSource from "../db/dataSource.js";

import { Role } from "../db/entities/Role.js";

import { UserNS } from "../@types/user.js";
import { User } from "../db/entities/userdb.js";

const createUser = (payload: UserNS.User) => {
    return dataSource.manager.transaction(async transaction => {
        try {
            const role = await Role.findOneBy({ name: payload.role });
            const newUser = User.create({
                ...payload,
                roles: [role] as Role[]
            });
            await transaction.save(newUser);
        } catch (error) {
            throw ("Something went wrong");
        }
    });
};
const  login = async (email: string, password: string) => {
    try {
        const user = await User.findOneBy({
            email
        });

        if (!user) {
            return undefined;
        }

        const passwordMatching = await bcrypt.compare(password, user?.password || '');

        if (user && passwordMatching) {
            const token = jwt.sign({
                email: user.email,
                userName: user.userName,
                displayName: user.displayName
            }, process.env.SECRET_KEY || "", {
                expiresIn: "14d"
            });

            return {
                name: user.displayName, // Assuming displayName is the name property
                email: user.email,
                token
            };
        } else {
            throw ("invalid email or password");
        }
    } catch (error) {
        throw ("invalid email or password");
    }
};

const getAllUsers = (searchTerm?: string, roleFilter?: string, page = 1, pageSize = 10) => {
    try {
        let queryBuilder = User.createQueryBuilder("user");

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
    } catch (error) {
        throw ("Something went wrong");
    }
};


const getAllRoles = () => {
    try {
        const roles = Role.find();
        return roles;
    } catch (error) {
        throw ("Something went wrong");
    }
};




export { createUser, getAllUsers,login,getAllRoles};

