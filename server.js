const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");

const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

dotenv.config({ path: "./config.env" });

const app = express();

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(`DB Error: ${err.message}`));

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// app.use(expressValidator());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
