import express from 'express';
import dataSource from './db/dataSource';
import logger from 'morgan';
import indexRouter from './routes/authRoutes.js'
import usersRouter from './routes/contentRoutes.js'

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

dataSource.initialize().then(() => {
  console.log('Connected to DB!');
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
