import express from 'express';

import { createConnection } from 'typeorm';

const app = express();
app.use(express.json());

// Set up database connection
createConnection().then(() => {
  console.log('Connected to the database');
}).catch((error) => {
  console.error('Database connection error:', error);
});

// Use validation middleware
app.use();
// Use routes
app.use();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
