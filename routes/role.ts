import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createRole } from "../controllers/permission";
import { getAllRoles } from "../controllers/user";
import { Role } from "../db/entities/Role";

const router = express.Router();


//router.post('/role', authenticate, authorize('create_role'),(req, res, next) => {

// router.post('/role', authenticate, (req, res, next) => {
//   createRole(req.body).then(data => {
//     res.status(201).send(data)
//   }).catch(error => {
//     res.status(500).send("something went wrong")
//   })
// });

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
  
  // Update an existing role
  //router.put('/roles/:roleId', authenticate,authorize('update_role'), async (req, res) => {
  
  router.put('/roles/:roleId', authenticate, async (req, res) => {
    try {
      const roleId = req.params.roleId; // This will take the ID from the URL
  
      // Find the role by its ID in the database
      const role = await Role.findOne({ where: { id: roleId } }); // Use FindOneOptions to specify the where clause
  
      if (!role) {
        return res.status(404).json({ error: 'Role not found' });
      }
  
      // Update role properties with the request body
      if (req.body.name) {
        role.name = req.body.name;
      }
  
      // Save the updated role to the database
      await role.save();
  
      res.status(200).json({ message: 'Role updated successfully' });
    } catch (error) {
      console.error('Error updating role:', error);
      res.status(500).json({ error: 'Failed to update role' });
    }
  });

  export default router;