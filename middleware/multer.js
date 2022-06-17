const multer = require("multer");
const fs = require("fs");
const crypto = require("crypto");
const path = require("path");

const storage = (field) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      const { customer_name } = req.body;
      const path = `./uploads/${customer_name}`;
      fs.mkdirSync(path, { recursive: true });

      cb(null, path);
      // var hash = crypto.createHash("sha256");
      // let filename = file.fieldname;
      // var finalPath = path;
      // console.log
      // var outStream = fs.createWriteStream(finalPath);

      // // file.stream.pipe(outStream);
      // // outStream.on("error", cb);
      // // file.stream.on("data", function (chunk) {
      // //   hash.update(chunk);
      // // });

      // // outStream.on("finish", function () {
      // //   cb(null, {
      // //     destination: __dirname,
      // //     filename: filename,
      // //     path: finalPath,
      // //     size: outStream.bytesWritten,
      // //     hash: hash.digest("hex"),
      // //   });
      // // });
    },
    filename: (req, file, cb) => {
      // cb(null, Date.now() + "-" + file.originalname);
      cb(null, file.originalname);
    },
  });

const fileFilter = (filters) => (req, file, cb) => {
  if (filters.some((item) => item === file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Wrong extension type"), false);
  }
};

async function addPathToBody(req, res, next) {
  if (req.files) {
    if (!Array.isArray(req.files)) {
      let files = {};
      Object.keys(req.files).map((key) => (files[key] = { files: [] }));
      for (var key in req.files) {
        req.files[key].map((file) =>
          files[key].files.push(
            file.path != undefined ? file.path.replace(/\\/g, "/") : null
          )
        );
        req.body["images"] = files;
      }
    } else {
      let files = [];
      req.files.map((file) => {
        files.push(
          file.path != undefined ? file.path.replace(/\\/g, "/") : null
        );
      });
      req.body["images"] = files;
    }
  }
  if (req.file) req.body["image"] = req.file.path.replace(/\\/g, "/");
  next();
}

const uploader = (folder) =>
  multer({
    storage: storage(folder),
    // fileFilter: fileFilter([
    //   "image/png",
    //   "image/jpg",
    //   "image/jpeg",
    //   "image/gif",
    //   "video/mp4",
    //   "application/pdf",
    //   "application/octet-stream",
    // ]),
    limits: { fileSize: 15 * 1024 * 1024 },
  });

module.exports = (folder = "/", field, type = "single") => {
  return [
    type === "array"
      ? uploader(folder).array(field)
      : type === "fields"
      ? uploader(folder).fields(field)
      : uploader(folder).single(field),
    addPathToBody,
  ];
};
