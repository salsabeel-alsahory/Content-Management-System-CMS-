import express from "express";
import { authenticate } from "../middleware/authMiddleware";
import { deleteMedia, getAllMedia, updateMedia } from "../controllers/content";
import { createMedia } from "../controllers/permission";

const router = express.Router();



//router.get('/media', authenticate, authorize('get_media'),async(req, res) => {

router.get('/media', authenticate, async(req, res) => {
    getAllMedia()
      .then((data: any) => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });
  
  //router.post('/media', authenticate, authorize('add_media'),async(req, res) => {
  
  router.post('/media', authenticate, async(req, res) => {
    createMedia(req.body)
      .then((data: any) => {
        res.status(201).send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });
  //router.put('/media/:id', authenticate,authorize('update_media'),async (req, res) => {
  
  router.put('/media/:id', authenticate,async (req, res) => {
    updateMedia(req.params.id, req.body)
      .then((data: any) => {
        res.status(200).send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });
  //router.delete('/media/:id', authenticate,authorize('delete_media'),async (req, res) => {
  
  router.delete('/media/:id', authenticate,async (req, res) => {
    deleteMedia(req.params.id)
      .then(() => {
        res.status(200).send('Media deleted successfully');
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  });
export default router;