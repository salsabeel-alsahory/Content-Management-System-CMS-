import express from "express";
import { createTag,updateTag,deleteTag} from '../controllers/tag'

const router = express.Router();

// Implement your routes here, similar to what you've already done

// POST route for creating a tag
router.post('/tags', async (req, res) => {
  try {
    const { title } = req.body;
    const tag = await createTag(title);
    res.status(201).json(tag);
  } catch (error) {
    console.error('Error creating tag:', error);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});
router.put('/tags/:tagId', async (req, res) => {
    try {
      const tagId = parseInt(req.params.tagId, 10); // Parse the tagId as a number
      const { title } = req.body;
  
      if (isNaN(tagId)) {
        return res.status(400).json({ error: 'Invalid tagId' });
      }
  
      const updatedTag = await updateTag(tagId, title);
      if (!updatedTag) {
        return res.status(404).json({ error: 'Tag not found' });
      }
      res.status(200).json(updatedTag);
    } catch (error) {
      console.error('Error updating tag:', error);
      res.status(500).json({ error: 'Failed to update tag' });
    }
  });
  
  router.delete('/tags/:tagId', async (req, res) => {
    try {
      const tagId = parseInt(req.params.tagId, 10); // Parse the tagId as a number
  
      if (isNaN(tagId)) {
        return res.status(400).json({ error: 'Invalid tagId' });
      }
  
      const success = await deleteTag(tagId);
      if (!success) {
        return res.status(404).json({ error: 'Tag not found' });
      }
      res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
      console.error('Error deleting tag:', error);
      res.status(500).json({ error: 'Failed to delete tag' });
    }
  });
  
  

export default router;
