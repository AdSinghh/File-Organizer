const fs = require("fs");
const path = require("path");

// Organize Function will organize all your target folder's files in different folders according to their extensions

// An object to categorize file types by their extensions
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
};

function organizeFn(dirPath) {
    // We need a directory path as a parameter
    let destPath;

    if (dirPath == undefined) {
      console.log("Please enter a valid Directory Path");
      return;
    } // Check whether a directory path is passed or not; if not, simply return

    let doesExist = fs.existsSync(dirPath);
    // This checks whether the target folder exists or not

    if (doesExist == true) {
      destPath = path.join(dirPath, "organized_Files"); 
      // Create a path for the 'organized_Files' folder within the given directory

      // Check whether a folder named 'organized_Files' exists at the destination path
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath); // If it doesn't exist, create the folder
      } else {
        console.log("Folder Already Exists"); // If it already exists, log a message
      }
    } else {
      console.log("Please Enter A valid Path");
      return;
    }
    // Call the organizeHelper function to start organizing files
    organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
    // Read all the file/folder names within the source directory
    let childNames = fs.readdirSync(src);

    // Iterate over each file/folder in the source directory
    for(let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i]); // Get the full path of the file/folder
        let isFile = fs.lstatSync(childAddress).isFile(); // Check if it's a file

        if(isFile == true) {
            let fileCategory = getCategory(childNames[i]); // Determine the file's category based on its extension
            console.log(childNames[i] + " belongs to " + fileCategory);
            sendFiles(childAddress, dest, fileCategory); // Move the file to the appropriate category folder
        }
    }
}

function getCategory(FileName) {
    let ext = path.extname(FileName).slice(1); // Extract the file extension and remove the dot (.)
    
    // Iterate over the 'types' object to determine the file's category
    for (let key in types) {
        let cTypeArr = types[key];
        for (let i = 0; i < cTypeArr.length; i++) {
            if (ext == cTypeArr[i]) {
                return key; // Return the category (e.g., 'media', 'documents') if a match is found
            }
        } 
    }
    return "others"; // If no match is found, categorize the file as 'others'
}

function sendFiles(srcFilePath, dest, fileCategory) {
    // Create a path for the category folder within the 'organized_Files' directory
    let catPath = path.join(dest, fileCategory);

    // Check if the category folder exists; if not, create it
    if (fs.existsSync(catPath) == false) {
        fs.mkdirSync(catPath);
    }

    let fileName = path.basename(srcFilePath); // Get the file name from the full path

    let destFilePath = path.join(catPath, fileName); // Create the destination file path within the category folder

    fs.copyFileSync(srcFilePath, destFilePath); // Copy the file from the source path to the destination path

    fs.unlinkSync(srcFilePath); // Delete the original file from the source location

    console.log("File Organized"); // Log a message indicating the file has been organized
}

// Export the organizeFn function under the name 'organizeFnKey'
module.exports = {
    organizeFnKey: organizeFn
};
