import AWS from 'aws-sdk';
import express from 'express';
import logger from 'morgan';
import dataSource from './db/dataSource';
import categoryRouter from './routes/category';
import contentRouter from './routes/contentRoutes.js';
import mediaRouter from './routes/media.js';
import permissionRouter from './routes/permission.js';
import roleRouter from './routes/role.js';
import tagRouter from './routes/tag';
import userRouter from './routes/user.js';

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use('/content', contentRouter);
app.use('/user', userRouter);
app.use('/permission', permissionRouter);
app.use('/role', roleRouter);
app.use('/media', mediaRouter);
app.use('/category', categoryRouter);
app.use('/tag',tagRouter);
const s3 = new AWS.S3({
  region: 'us-east-1',
  accessKeyId: process.env.ACCESSKEYID,
  secretAccessKey: process.env.SECRETACCESSKEY,
  signatureVersion: 'v4'
});

const PORT = process.env.PORT || 5000;

dataSource.initialize().then(() => {
  console.log('Connected to DB!');
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
