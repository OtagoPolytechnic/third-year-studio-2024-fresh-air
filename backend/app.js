// Import the Express and Body-Parser module
import express, { urlencoded, json } from "express"; 
import bodyParser from "body-parser";

// Import the CORS module
import cors from 'cors';

// Import from routes module
import test from './routes/test.js';

// Create an Express application
const app = express();

// Use the CORS module and body-parser
app.use(bodyParser.json());
app.use(cors());

// Use the routes module
app.use('/test', test);

app.post('https://webhooktest-6o78.onrender.com/api/v1/integration/webhook', (req, res) => {
    const payload = req.body;
    const uplink = payload.uplink_message;
    res.status(200).send('Webhook received successfully.');
    return res.json({
        uplink
    });
})

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});

// Export the Express application
export default app;