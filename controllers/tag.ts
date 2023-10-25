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

  export{createTag, deleteTag,updateTag}
  