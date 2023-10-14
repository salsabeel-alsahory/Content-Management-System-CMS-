
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt';
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { In } from "typeorm";
import dataSource from "../db/dataSource.js";
import { User } from "../db/entities/userdb.js";
import { UserNS } from "../@types/user.js";


const createUser = (payload: UserNS.User) => {
    return dataSource.manager.transaction(async transaction => {
        const role = await Role.findOneBy({ name: payload.role })
        const newUser = User.create({
            ...payload,
            roles: [role] as Role[]
        });
        await transaction.save(newUser);
    });
}

const createPermission = async (payload: Permission) => {
    try {
        const permission = Permission.create(payload)
        await permission.save()
    } catch (error) {
        throw ("Something went wrong")
    }
}


const createRole = async (payload: Role) => {
    try {
        const role = new Role()
        role.name = payload.name
        role.permissions = await Permission.findBy({
            id: In(payload.permissions)
        })

        await role.save()
    } catch (error) {
        throw ("Something went wrong")
    }
}


const login = async (email: string, password: string) => {
    try {
        const user = await User.findOneBy({
            email
        });

        if (!user) {
            return undefined
        }

        const passwordMatching = await bcrypt.compare(password, user?.password || '')

        if (user && passwordMatching) {
            const token = jwt.sign({
                email: user.email,
                userName: user.userName,
                displayName: user.displayName
            }, process.env.SECRET_KEY || "", {
                expiresIn: "14d"
            })

            return {
                user,
                token
            }
        } else {
            throw ("invalid email or password")
        }
    } catch (error) {
        throw ("invalid email or password")
    }
}

const getAllUsers = () => {
    const users = User.find()
    return users
}

const getAllRoles = () => {
    const roles = Role.find()
    return roles
}

const getAllPermission = () => {
    const permission = Permission.find()
    return permission
}

export { createUser, login, getAllUsers, createPermission, createRole, getAllRoles, getAllPermission }