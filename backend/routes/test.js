// Import the Express module
import express from "express";

// Import the index controllers module
import { get } from "../controllers/test.js";

// Create an Express router
const router = express.Router();

// Create a GET route
router.get("/", get);

// Export the router
export default router;