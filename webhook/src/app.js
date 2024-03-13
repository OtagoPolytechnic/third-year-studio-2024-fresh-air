import express from 'express';
import { INDEX_PATHS } from './utils/constants/globalConstants';

const app = express();

app.listen(3000, () => {
    console.log("Server running on port 3000");
})