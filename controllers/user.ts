import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { Role } from "../db/entities/Role.js";
import { Permission } from "../db/entities/Permission.js";
import { In, QueryFailedError } from "typeorm";
import dataSource from "../db/dataSource.js";

import { UserNS } from "../@types/user.js";
import { User } from "../db/entities/userdb.js";
import { Article, Content, Video } from "../db/entities/Content.js";

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
  


export { createUser, login, getAllUsers, createPermission, createRole, getAllRoles, getAllPermission, createContent, getAllContent,createVideo
 ,createArticle , getAllArticles
,getAllVideos, incrementLikes };
