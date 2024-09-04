// We will be creating a File System Organizer
// Features of the Project:
// If you have numerous files in a folder and they are not properly arranged,
// you can use this tool to arrange them in specific directories according to their extensions.
// For example, text files will go into a "text" folder, .exe files into an "application" folder, and so on.
// At the end, you will have a neatly organized set of files in specific folders.

// Importing required modules from the commands directory
const helpModule = require('../commands/help'); // Importing the help module that provides a help function
const organizeModule = require('../commands/organize'); // Importing the organize module that provides an organize function
const treeModule = require('../commands/tree'); // Importing the tree module that provides a tree function

// Storing the command-line arguments after slicing out the first two elements
// process.argv is an array that contains command-line arguments passed to the Node.js process
let input = process.argv.slice(2); // Removing the first two elements of the array (node executable path and file path)
console.log(input); // Logging the input array for debugging purposes

// Storing the remaining command-line arguments in the inputArr array
let inputArr = input; // Example: [ 'organize', 'folderpath' ]

// Extracting the command (the first element) from the input array
let command = inputArr[0]; // Example: 'organize'

// Using a switch statement to handle different commands based on the input
switch(command) {

    // If the command is 'tree', call the tree function from the tree module
    case 'tree':
        treeModule.treeFnKey(inputArr[1]); // The tree function takes the folder path as an argument
        break;

    // If the command is 'help', call the help function from the help module
    case 'help':
        helpModule.helpFnKey(); // The help function does not require any arguments
        break;

    // If the command is 'organize', call the organize function from the organize module
    case 'organize':
        organizeModule.organizeFnKey(inputArr[1]); // The organize function takes the folder path as an argument
        break;
        
    // If the command is not recognized, print an error message to the console
    default:
        console.log("Please enter a valid command"); // Inform the user that the command is invalid
}








