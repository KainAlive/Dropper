const express = require("express");
const path = require("path");
const fs = require("fs");
const fileUpload = require('express-fileupload');
const cors = require("cors")
const helpers = require("./helpers")

const PORT = 80;

var app = express();
app.use(fileUpload());
app.use(cors());
app.use(express.static('public'));

// Return json of all files within the data directory
app.get("/data", (req, res, next) => {
    let filesJSON = helpers.readFiles();
    res.send(filesJSON);
})
app.get("/data/:foldername", (req, res, next) => {
    console.log("Reading from folder");
    let filesJSON = helpers.readFiles(req.params.foldername);
    res.send(filesJSON);
})

// Sends the selected file
app.get("/download/:id", (req, res) => {
    let files = helpers.readFiles();
    let filename = files[req.params.id].name;
    const file = path.join(helpers.UPLOAD_DIR, filename);
    console.log(`[+] Serving file ${file}`);
    res.download(file);
})

// Handels the upload of a file
app.post("/upload", (req, res) => {
    //console.log(req.files.file);
    try {
        req.files.file.mv(path.join(helpers.UPLOAD_DIR, req.files.file.name));
        console.log(`[+] Saved file ${req.files.file.name} -> ${path.join(helpers.UPLOAD_DIR, req.files.file.name)} (${req.files.file.size})`);
        
    } catch (error) {
        console.log("Somethng went wrong...")
    }
    res.redirect("/");
})

// Deletes the givin file
app.get("/delete/:id", (req, res, next) => {
    let files = helpers.readFiles();
    let filename = files[req.params.id].name;
    const file = path.join(__dirname + "/data/" + filename);
    console.log(`Deleting file ${file}`)
    fs.unlinkSync(file);
    res.redirect("/")
})
//
app.listen(PORT, () => {
    console.log("Listening on port", PORT);
    console.log("http://localhost:" + PORT)
})