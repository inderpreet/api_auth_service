const express = require("express");
const app = express();

// import routes
const authRoute = require("./routes/auth");


// route middleware
app.use("/api/user", authRoute);


app.listen(3000, ()=> console.log("Server running at 3000"));
