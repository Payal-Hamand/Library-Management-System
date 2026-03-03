require("dotenv").config();
const express = require("express");
const dbConnect = require("./src/config/dbConnection");
const cors = require("cors");
const authRoutes = require("./src/routers/authRoutes");
const bookRoutes = require("./src/routers/bookRoutes");
const { ensureAdminExists } = require("./src/helper/seedAdmin");

const app = express();

app.use(cors());
app.use(express.json());
dbConnect();
ensureAdminExists();

app.use("/auth", authRoutes);
app.use("/books", bookRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Library Management API is running");
});



app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });

 

