const fs = require("fs");
const path = require("path");

// Function to display the directory structure in a tree-like format
function treeFn(dirPath) {
    // Check if the directory path is provided
    if (dirPath == undefined) {
        console.log("Please Enter a Valid Path");
        return;
    } else {
        // Check if the provided directory path exists
        let doesExist = fs.existsSync(dirPath);
        if (doesExist == true) {
            // Call the treeHelper function to display the directory structure
            treeHelper(dirPath, " ");
        }
    }
}

// Recursive helper function to build the tree structure
function treeHelper(targetPath, indent) {
    // Check if the targetPath is a file
    let isFile = fs.lstatSync(targetPath).isFile();

    if (isFile == true) {
        // If it's a file, print the file name with the appropriate indentation
        let fileName = path.basename(targetPath);
        console.log(indent + "├── " + fileName);
    } else {
        // If it's a directory, print the directory name with the appropriate indentation
        let dirName = path.basename(targetPath);
        console.log(indent + "└──" + dirName);

        // Read all files and directories within the current directory
        let children = fs.readdirSync(targetPath);

        // Recursively call treeHelper for each child item (file or directory)
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(targetPath, children[i]);
            treeHelper(childPath, indent + "\t");
        }
    }
}

// Export the treeFn function under the name treeFnKey
module.exports = {
    treeFnKey: treeFn
};
