import express from 'express';
import dataSource from './db/dataSource';
import logger from 'morgan'
const app = express();
app.use(express.json());
app.use(logger('dev'));
// Set up database connection
// createConnection()
//   .then(() => {
//     console.log('Connected to the database');
//   })
//   .catch((error) => {
//     console.error('Database connection error:', error);
//   });

// Example middleware
app.use((req, res, next) => {
  // Custom middleware logic here
  next(); // Don't forget to call next to pass control to the next middleware/route
});

// Example route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Use more routes and middleware as needed for your application

const PORT = process.env.PORT || 5000;

dataSource.initialize().then(() => {
  console.log("Connected to DB!");
}).catch(err => {
  console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
  logger(`App is listening on port ${PORT}`);
  console.log(`App is listening on port ${PORT}`);
});
