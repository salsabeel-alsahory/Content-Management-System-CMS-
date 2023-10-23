import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createRole } from "../controllers/permission";
import { getAllRoles } from "../controllers/user";
import { Role } from "../db/entities/Role";

const router = express.Router();




router.post('/role', authenticate, (req, res, next) => {
    createRole(req.body).then((data) => {
      res.status(201).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });
  //router.get('/roles', authenticate,  authorize('view_roles'),function (req, res, next) {
  
  router.get('/roles', authenticate,function (req, res, next) {
    getAllRoles().then(data => {
      res.status(200).send(data)
    }).catch(err => {
      console.error(err);
      res.status(500).send(err);
    });
  });
 // Update an existing role by ID
 //  const role = await Role.findOne({ where: { id: roleId } });

 router.put('/roles/:roleId', authenticate, async (req, res) => {
    try {
      const roleId = req.params.roleId; // Get the role ID from the URL
  
      const role = await Role.findOne({ where: { id: roleId } });

  
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
  
      if (req.body.name) {
        const newName = req.body.name;
  
        // Check if the new name is already in use
        const existingRole = await Role.findOne({ where: { name: newName } });
  
        if (existingRole) {
          return res.status(400).json({ error: 'Role name already exists' });
        }
  
        // Ensure the updated name is one of the enum values
        if (['user', 'admin', 'editor'].includes(newName)) {
          role.name = newName;
        } else {
          return res.status(400).json({ error: 'Invalid role name' });
        }
      }
  
      await role.save();
  
      res.status(200).json({ message: 'Role updated successfully' });
    } catch (error: any) {
        console.error('Error updating role:', error);
    
        if (error.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ error: 'Role name already exists' });
        } else {
          res.status(500).json({ error: 'Failed to update role' });
        }
      }
  });
 
// Delete an existing role by ID
router.delete('/roles/:roleId', authenticate, async (req, res) => {
    try {
      const roleId = req.params.roleId; // Get the role ID from the URL
  
      // Find the role by its ID in the database
      const role = await Role.findOne({ where: { id: roleId } });
  
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
  
      // Delete the role from the database
      await role.remove();
  
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error: any) {
      console.error('Error deleting role:', error);
      res.status(500).json({ error: 'Failed to delete role' });
    }
  });

  export default router;