import { In } from "typeorm";
import { Media } from "../db/entities/Media";
import { Permission } from "../db/entities/Permission";
import { Role } from "../db/entities/Role";
const createPermission = async (payload: Permission) => {
    try {
        const permission = Permission.create(payload);
        await permission.save();
    } catch (error) {
        throw ("Something went wrong");
    }
};
const createRole = async (payload: Role) => {
    try {
        const role = new Role();
        role.name = payload.name;
        role.permissions = await Permission.findBy({
            id: In(payload.permissions)
        });

        await role.save();
    } catch (error) {
        throw ("Something went wrong");
    }
};
const getAllPermission = () => {
    try {
        const permission = Permission.find();
        return permission;
    } catch (error) {
        throw ("Something went wrong");
    }
};



const createMedia = async (payload: Media) => {
    try {
        const newMedia = new Media();
        newMedia.name = payload.name;
        newMedia.image = payload.image;

        newMedia.permissions = await Permission.findBy({
                        id: In(payload.permissions)
                    });
        await newMedia.save();
    } catch (error) {
        throw ("Failed to create media: " + error);
    }
};

export { createMedia, createPermission, createRole, getAllPermission };
