import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category";

const router = express.Router();


// Category routes
//router.get('/categories', authenticate,authorize('get_category'),async (req, res) => {

router.get('/categories', authenticate,async (req, res) => {
    getAllCategories()
      .then((data: any) => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });
  //router.post('/categories', authenticate,authorize('add_category'),async  (req, res) => {
  
  router.post('/categories', authenticate,async  (req, res) => {
    createCategory(req.body)
      .then((data: any) => {
        res.status(201).send(data);
      })
      .catch((error: any) => {
        console.error(error);
        res.status(500).send('Something went wrong');
      });
  });
  //router.put('/categories/:id', authenticate,authorize('update_category'),async  (req, res) => {
  
  router.put('/categories/:id', authenticate,async  (req, res) => {
    updateCategory(req.params.id, req.body)
      .then((data: any) => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });
  //router.delete('/categories/:id', authenticate,authorize('delete_category'),async  (req, res) => {
  
  router.delete('/categories/:id', authenticate,async  (req, res) => {
    deleteCategory(req.params.id)
      .then(() => {
        res.status(200).send('Category deleted successfully');
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });

  export default router;