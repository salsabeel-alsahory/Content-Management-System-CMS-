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
                user,
                token
            };
        } else {
            throw ("invalid email or password");
        }
    } catch (error) {
        throw ("invalid email or password");
    }
};

const getAllUsers = () => {
    try {
        const users = User.find();
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




export { createUser,  getAllRoles, getAllUsers,login,  };

