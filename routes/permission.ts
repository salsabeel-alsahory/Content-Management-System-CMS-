import express from "express";
import { createPermission, getAllPermission } from "../controllers/permission";
import { authenticate } from "../middleware/authMiddleware";
import { Permission } from "../db/entities/Permission";

const router =express.Router();

/* POST permission. --------------------------------------------------------------------------------------------------*/

//router.post('/permission',authorize('create_permission'), (req, res, next) => {

router.post('/permission', (req, res, next) => {
    try {
      createPermission(req.body)
      res.status(201).send("permission created successfully")
    } catch (error) {
      res.status(500).send("something went wrong")
    }
  });
  
  
  //router.get('/permission', authenticate, authorize('view_permissions'),function (req, res, next) {
  
  router.get('/permission', authenticate, function (req, res, next) {
    getAllPermission().then(data => {
      res.status(200).send(data)
    }).catch(error => {
      console.log(error);
      res.status(500).send("something went wrong")
    })
  });
  
  // Define a route to update an existing permission
  //router.put('/permissions/:permissionId', authenticate,authorize('update_permission'), async (req, res) => {
  
  router.put('/permissions/:permissionId', authenticate, async (req, res) => {
    try {
      const permissionId = req.params.permissionId; // Get the permission ID from the URL
  
      // Find the permission by its ID in the database
      const permission = await Permission.findOne({ where: { id: permissionId } });
  
      if (!permission) {
        return res.status(404).json({ error: 'Permission not found' });
      }
  
      // Update permission properties with the request body
      if (req.body.name) {
        permission.name = req.body.name;
      }
  
      // Save the updated permission to the database
      await permission.save();
  
      res.status(200).json({ message: 'Permission updated successfully' });
    } catch (error) {
      console.error('Error updating permission:', error);
      res.status(500).json({ error: 'Failed to update permission' });
    }
  });

  export default router;