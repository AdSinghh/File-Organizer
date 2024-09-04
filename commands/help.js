// help function will list all the ways by which you can run the command
function helpFn() {
    // The console.log function prints a formatted list of commands to the console.
    // It shows three commands: Tree, Organize, and Help, with example usage.
    console.log(`List of all the commands:
                  (1) Tree - node fo.js tree <dirPath>
                  (2) Organize - node fo.js organize <dirPath>
                  (3) Help - node fo.js help`);
}

// Exporting the helpFn function under the name helpFnKey
module.exports = {
    // 'helpFnKey' is the key name that will be used to access this function when this module is imported in another file.
    // 'helpFn' is the actual function being assigned to 'helpFnKey'.
    helpFnKey: helpFn
};
