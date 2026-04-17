const express = require("express");
const cors = require("cors");
const multer = require("multer");
const app = express();

app.use(cors());                                                    // Allows connection between multiple services
app.use(express.static("public"));                                  // Searches for files in the public folder

const storage = multer.diskStorage({                                // multer.diskStorage allows to set the stored file's location and name
    destination: (req, file, cb) => {                               // cb: callback function
        cb(null, "uploads/");
    },
    
    filename: (req, file, cb) => {
        cb(null, Date.now() + ".jpg");
    }
});

const upload = multer({ storage });
  
app.post("/upload", upload.single("photo"), (req, res) => {         // Endpoint that stores the file/photo in the designed storage defined above. "photo" is a created HTML attribute
    console.log("Foto recebida:", req.file.filename);

    res.json({
        message: "Foto guardada",
        file: req.file.filename
    });
});

app.listen(3000, () => {
    console.log("Server running: http://localhost:3000");
});