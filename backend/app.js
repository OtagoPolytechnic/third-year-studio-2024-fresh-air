// Import the Express module
import express, { urlencoded, json } from "express"; 

// Import the CORS module
import cors from 'cors';

// Import the index routes module
import test from './routes/test.js';

// Create an Express application
const app = express();

// Use the CORS module
app.use(cors());

// Use the routes module
app.use('/test', test);

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application
export default app;