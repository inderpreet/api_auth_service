const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// import routes
const authRoute = require("./routes/auth");
const privateRoute = require("./routes/private");

dotenv.config();

// connect to db
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

// Other middleware
app.use(express.json());

// Routes middleware
app.use("/api/user", authRoute);
app.use("/api/data", privateRoute);

app.listen(3000, () => console.log("Server running at 3000"));
