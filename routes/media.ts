import express from "express";
import { UploadedFile } from 'express-fileupload';
import { deleteMedia, getAllMedia, updateMedia } from "../controllers/content";
import { createMedia } from "../controllers/permission";
import { authenticate } from "../middleware/authMiddleware";
import { configureS3Bucket } from "../services/config_S3bucket";

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
  // Import necessary modules and dependencies
router.post('/media',authenticate, async (req, res) => {
  try {
    // Check if the uploaded file exists in the request
    const uploadedFile = req.files?.image as UploadedFile;
    // console.log("req file", req.files)
    // console.log("req img", req.body.image)

console.log("upload file", uploadedFile)
    if (!uploadedFile || !uploadedFile.data) {
      return res.status(400).json({ error: "Post should have an image" });
    }

    // Configure the S3 bucket
    const S3 = await configureS3Bucket();

    // Define upload parameters for the S3 bucket
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Body: Buffer.from(uploadedFile.data),
      Key: `${Date.now().toString()}.png`,
      ACL: 'public-read',
    };

    // Upload the file to S3
    const data = await S3.upload(uploadParams).promise();
req.body.image=data.Location;
    // Create media using the request body
    createMedia(req.body)
      .then((createdData: any) => {
        res.status(201).send(createdData);
      })
      .catch(err => {
        console.error(err);
        res.status(500).send(err);
      });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
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