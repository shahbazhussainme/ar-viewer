// Init
require("dotenv").config();
const express = require("express");
//app
const app = express();
const port = process.env.PORT || 5000;
require("./database");

// Middleware
require("./middleware/common")(app);
app.use(express.static("public"));
// Routes
app.use("/api", require("./routes"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Server
app.listen(port || 5000, () => {
  console.log(`Server is running at port ${port} :)`);
});
