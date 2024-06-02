require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const queryRoutes = require("./routes/queries");

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/queries", queryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
