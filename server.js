const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const passport = require("passport");
const session = require("express-session")

const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const googleOpenAuth = require("./routes/googleOpenAuth");

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

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth/google", googleOpenAuth);


app.use("/api/users", userRoutes);


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
