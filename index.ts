import express from 'express';
import fileUpload from 'express-fileupload';
import logger from 'morgan';
import dataSource, { initDB } from './db/dataSource';
import baseLogger from './logger.js';
import { error404Handler, errorLogger, errorSender } from './middleware/errorHandlers/genericHandler';
import categoryRouter from './routes/category';
import contentRouter from './routes/contentRoutes.js';
import mediaRouter from './routes/media.js';
import permissionRouter from './routes/permission.js';
import roleRouter from './routes/role.js';
import tagRouter from './routes/tag';
import userRouter from './routes/user.js';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
app.use(express.json());
app.use(logger('dev'));
app.use('/content', contentRouter);
app.use('/user', userRouter);
app.use('/permission', permissionRouter);
app.use('/role', roleRouter);
app.use('/media', mediaRouter);
app.use('/category', categoryRouter);
app.use('/tag',tagRouter);
app.use(errorLogger);
app.use(errorSender);
app.use(error404Handler);

const PORT = process.env.PORT || 5000;
app.get("/health", function (req, res) {
  res.sendStatus(200);
});
dataSource.initialize().then(() => {
  console.log('Connected to DB!');
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

// app.listen(PORT, () => {.
//   console.log(`App is listening on port ${PORT}`);
// });

app.listen(PORT, () => {
  baseLogger.info(`App is listening on port ${PORT}`);
  initDB();
});
