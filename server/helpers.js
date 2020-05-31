const fs = require("fs");
const path = require("path");

const UPLOAD_DIR = path.join(__dirname, "data");

let herlpers = {
    UPLOAD_DIR: UPLOAD_DIR,
    // Reads all files from the data directory and returns a json array
    readFiles: (directoryName) => {
        if (typeof directoryName === "undefined") {
            directoryName = UPLOAD_DIR
        } else {
            directoryName = path.join(UPLOAD_DIR, directoryName);
        }
        var filesJSON = [];
        var f = fs.readdirSync(directoryName);
        f.forEach((filename, index) => {
            let filetype;
            let fileInfo = fs.statSync(path.join(directoryName, filename));
            let fileExtention = path.extname(path.join(directoryName, filename));
            if (fileInfo.isDirectory()) {
                filetype = "Directory";
            } else if (fileInfo.isFile()) {
                filetype = "File";
            } else {
                filetype = "undefined";
            }

            filesJSON.push({
                "id": index, 
                "name": filename,
                "size": fileInfo.size,
                "extention": fileExtention,
                "filetype": filetype
            });
        })
        return filesJSON;
    },
}
module.exports = herlpers;