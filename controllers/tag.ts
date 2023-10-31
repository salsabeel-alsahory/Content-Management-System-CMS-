import { ILike, Like, getRepository } from "typeorm";
import { Tag } from "../db/entities/Tag";

const createTag = async (title: string): Promise<Tag> => {
    const tag = new Tag();
    tag.title = title;
    await tag.save();
    return tag;
  };

  const deleteTag = async (tagId: number): Promise<boolean> => {
    try {
        // Find the tag by ID
        const tag = await Tag.findOne({ where: { id: tagId } });
    
        if (!tag) {
            return false; // Tag not found
        }
    
        // Delete the tag
        await tag.remove();
    
        return true; // Tag deleted successfully
    } catch (error) {
        throw error; // Handle the error as needed
    }
};
const updateTag = async (tagId: number, title: string): Promise<Tag | null> => {
    try {
        // Find the tag by ID
        const tag = await Tag.findOne({ where: { id: tagId } });

        if (!tag) {
            return null; // Tag not found
        }

        // Update the tag's title
        tag.title = title;

        // Save the updated tag to the database
        await tag.save();

        return tag; // Return the updated tag
    } catch (error) {
        throw error; // Handle the error as needed
    }
};
const getAllTags = async () => {
    try {
      const tagRepository = getRepository(Tag);
      const tags = await tagRepository.find();
  
      return tags;
    } catch (error) {
      throw new Error('Failed to retrieve tags: ' + error);
    }
  };

// Modify your searchTags function to accept the search query
// const searchTags = async (searchTerm: string) => {
//     try {
//       // Implement your tag search logic here
//       const tags = await Tag.find({ where: { title: Like(`%${searchTerm}%`) } });
  
//       return tags;
//     } catch (error) {
//       console.error('Error searching for tags:', error);
//       throw new Error('Failed to search for tags');
//     }
//   };
const searchTags = async (searchTerm: string) => {
    try {
      if (!searchTerm) {
        return []; // Return an empty array if searchTerm is not provided
      }
  
      const tagRepository = getRepository(Tag);
      const tags = await tagRepository.find({
        where: {
          title: ILike(`%${searchTerm}%`), // Perform a case-insensitive search
        },
      });
  
      return tags;
    } catch (error) {
      console.error('Error searching for tags:', error);
      throw new Error('Failed to search for tags');
    }
  };
  
  export{createTag, deleteTag,updateTag,getAllTags, searchTags }
  