// Init
require("dotenv").config();
//requiring path and fs modules
const path = require("path");
const fs = require("fs");
const app = require("express")();
const port = process.env.PORT || 5000;
require("./database");

// Middleware
require("./middleware/common")(app);

// Routes
app.use("/api", require("./routes"));
// app.get("/", (req, res) => {
//   res.json({ message: "welcomre! app working" });
// });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// app.get("/uploads", (req, res) => {
//   const directoryPath = path.join(__dirname, "uploads");
//   //passsing directoryPath and callback function
//   fs.readdir(directoryPath, function (err, files) {
//     //handling error
//     if (err) {
//       res.json({ message: "Directory doesn't exist" });

//       return console.log("Unable to scan directory: " + err);
//     }
//     let array = [];
//     //listing all files using forEach
//     files.forEach(function (file) {
//       // generate url for uploaded file
//       let url = process.env.BASE_URL + "/uploads/" + file;
//       array.push(url);
//     });
//     res.json({ files: array });
//   });
// });
app.get("/uploads/:name", (req, res) => {
  const directoryPath = path.join(__dirname, `uploads/${req.params.name}`);
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
      res.json({ message: "Directory doesn't exist" });

      return console.log("Unable to scan directory: " + err);
    }
    let array = [];
    //listing all files using forEach
    files.forEach(function (file) {
      // generate url for uploaded file
      let url =
        process.env.BASE_URL + "/uploads/" + req.params.name + "/" + file;
      array.push(url);
    });
    res.json({ files: array });
  });
});
// Server
app.listen(port || 5000, () => {
  console.log(`Server is running at port ${port} :)`);
});
