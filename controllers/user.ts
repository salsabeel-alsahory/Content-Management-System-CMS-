import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { In, QueryFailedError } from "typeorm";
import dataSource from "../db/dataSource.js";
import { Permission } from "../db/entities/Permission.js";
import { Role } from "../db/entities/Role.js";

import { UserNS } from "../@types/user.js";
import { Category } from "../db/entities/Category.js";
import { Article, Content, Video } from "../db/entities/Content.js";
import { Media } from "../db/entities/Media.js";
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

const getAllPermission = () => {
    try {
        const permission = Permission.find();
        return permission;
    } catch (error) {
        throw ("Something went wrong");
    }
};

const getAllContent = () => {
    try {
        const content = Content.find();
        return content;
    } catch (error) {
        throw ("Something went wrong");
    }
};

const createContent = async (payload: Content) => {
    try {
        // Create a new content item based on the payload
        const newContent = Content.create(payload);
        // Save the new content item to the database
        await newContent.save();

        return newContent; // Return the newly created content
    } catch (error) {
        throw ('Failed to create content: ' + error);
    }
};

const createVideo = async (payload: Video) => {
  
    try {
       
        const video = Video.create(payload);
       
        await video.save();
        console.log("here is worke ");
        return video; // Return the newly created video
    } catch (error) {
        if (error instanceof QueryFailedError) {
            // Handle database query errors (e.g., unique constraint violations)
            throw 'Database error: ' + error.toString();
        } else {
            throw 'Failed to create video: ' + (error as Error).toString();
        }
    }
};

  const createArticle = async (payload: Article) => {
    try {
      const article = Article.create(payload);
      await article.save();
      return article;
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw ('Database error: ' + error.toString());
      } else {
        throw 'Failed to create video: ' + (error as Error).toString();      }
    }
  };
  

  async function getAllArticles() {
    try {
      const articles = await Article.find();
      return articles;
    } catch (error) {
      console.error('Error fetching articles:', error);
      throw new Error('Failed to retrieve articles');
    }
  }
  async function getAllVideos() {
    try {
      const videos = await Video.find();
      return videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      throw new Error('Failed to retrieve videos');
    }
  }
  const incrementLikes = async (content: { getContentId?: () => any; }) => {
    try {
      if (!content || !content.getContentId) {
        throw 'Invalid content object or missing getContentId method';
      }
  
      // Get the content ID using the getContentId method
      const contentId = content.getContentId();
      
      if (!contentId) {
        throw 'Content ID is missing or invalid';
      }
      
      // Find the content by its ID
      const foundContent = await Content.findOne(contentId);
  
      if (!foundContent) {
        throw 'Content not found';
      }
  
      // Increment the likes
      foundContent.likes++;
  
      // Save the updated content to the database
      await foundContent.save();
  
      return foundContent;
    } catch (error) {
      throw `Failed to increment likes: ${error}`;
    }
    
  };
  



  const createMedia = async (payload: Media) => {
    try {
        const newMedia = new Media();
        newMedia.name = payload.name;
        newMedia.permissions = await Permission.findBy({
                        id: In(payload.permissions)
                    });
        await newMedia.save();
    } catch (error) {
        throw ("Failed to create media: " + error);
    }
};

const getAllMedia = async () => {
  try {
    const media = await Media.find();
    return media;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const updateMedia = async (id: string, payload: Media) => {
    try {
        const mediaToUpdate = await Media.findOne({  where: {id:(id)}  }  );
        if (mediaToUpdate) {
            Object.assign(mediaToUpdate, payload);
            await mediaToUpdate.save();
            return mediaToUpdate;
        } else {
            throw ("Media not found");
        }
    } catch (error) {
        throw ("Failed to update media: " + error);
    }
};

const deleteMedia = async (id: string) => {
    try {
        const mediaToDelete = await Media.findOne({  where: {id:(id)}  }  );
        if (mediaToDelete) {
            await Media.remove(mediaToDelete);
        } else {
            throw ("Media not found");
        }
    } catch (error) {
        throw ("Failed to delete media: " + error);
    }
};

// Category functions
const createCategory = async (payload: Category) => {
    try {
        const newCategory = Category.create(payload);
        await newCategory.save();
        return newCategory;
    } catch (error) {
        throw ("Failed to create category: " + error);
    }
};

const getAllCategories = () => {
    try {
        return Category.find();
    } catch (error) {
        throw ("Something went wrong");
    }
};

const updateCategory = async (id: string, payload: Category) => {
    try {
        const categoryToUpdate = await Category.findOne({
            where: {id: Number(id)}
            }
            );
        if (categoryToUpdate) {
            Object.assign(categoryToUpdate, payload);
            await categoryToUpdate.save();
            return categoryToUpdate;
        } else {
            throw ("Category not found");
        }
    } catch (error) {
        throw ("Failed to update category: " + error);
    }
};

const deleteCategory = async (id: string) => {
    try {
        const categoryToDelete = await Category.findOne({
            where: {id: Number(id)}
            }
            );
        if (categoryToDelete) {
            await Category.remove(categoryToDelete);
        } else {
            throw ("Category not found");
        }
    } catch (error) {
        throw ("Failed to delete category: " + error);
    }
};
export { createArticle, createCategory, createContent, createMedia, createPermission, createRole, createUser, createVideo, deleteCategory, deleteMedia, getAllArticles, getAllCategories, getAllContent, getAllMedia, getAllPermission, getAllRoles, getAllUsers, getAllVideos, incrementLikes, login, updateCategory, updateMedia };

