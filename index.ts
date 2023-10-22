import express from 'express';
import logger from 'morgan';
import dataSource from './db/dataSource';
import indexRouter from './routes/authRoutes.js';
import usersRouter from './routes/contentRoutes.js';

const app = express();

app.use(express.json());
app.use(logger('dev'));
app.use('/', indexRouter);
app.use('/user', usersRouter);
// Define your POST route for signup
app.post('/signup', (req, res) => {
  
  res.status(200).json({ message: 'Signup successful' });
});

const PORT = process.env.PORT || 5000;

// const AWS = require('aws-sdk');

// let s3 = new AWS.S3({
//   region: 'us-east-1', // Uncomment and adjust as needed
//   accessKeyId: process.env.ACCESSKEYID,
//   secretAccessKey: process.env.SECRETACCESSKEY
// });

// s3.putObject({
//   Bucket: 'suzans3',
//   Key: 'my-txt-file.txt',
//   Body: Buffer.from('This is my text file')
// }, (error, data) => {
//   if (error) {
//     console.error("Error uploading to S3:", error);
//   } else {
//     console.log("Successfully uploaded to S3:", data.ETag);
//   }
// });


dataSource.initialize().then(() => {
  console.log('Connected to DB!');
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
