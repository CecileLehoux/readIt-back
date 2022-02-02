const express = require("express");
const cors = require("cors");
const setupRoutes = require("./routes");
require("dotenv").config();

const app = express();

// pre-route middlewares
app.use(cors({ credentials: true}));
app.use(express.json());

// routes
setupRoutes(app);


