import { Category } from "../db/entities/Category";
import { Tag } from "../db/entities/Tag";

export namespace UserNS {

    export interface User {
        id: string,
        userName: string,
        email: string
        password: string,
        role: 'user' | 'admin' | 'editor'
    }

    export interface Role {
        id: number,
        name: 'user' | 'admin' | 'editor',
        permission: number
    }
    export interface Permission {
        id: number,
        name: string,
    }
    export interface Content {
        id: number;
        title: string;
        content: string;
        category: Category;
        tags: Tag[];
    }
    export interface Video extends Content {
        videoUrl: string;
      }
      
      export interface Audio extends Content {
        audioUrl: string;
      }
      
      export interface Article extends Content {
        articleContent: string;
      }
    export interface Category {
        id: number;
        name: string;
        contents: Content[]; 
      }
      export interface Tag {
        id: number;
        title: string;
        contents: Content[]; 
      }
      
}