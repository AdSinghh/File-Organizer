const fs = require("fs");

const path = require("path");

// Organize Function will organize all your target folder's files in a different folders acc to their extensions


let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };



function organizeFn(dirPath) {
    // we need a directory path as parameter
    let destPath;
    if (dirPath == undefined) {
      console.log("Please enter a valid Directory Path");
      return;
    } // check whether directory path is passed or not and if not simply return
  
    let doesExist = fs.existsSync(dirPath);
  
    // this doesExist will tell the Target Folder exists or not
  
    if (doesExist == true) {
      destPath = path.join(dirPath, "organized_Files"); 
  
      // we created a path for organized_Files Folder
  
      // check whether in the given destPath does a folder exist with same name and if does not make a folder
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      } else {
        console.log("Folder Already Exists");
      }
    } else {
      console.log("Please Enter A valid Path");
      return;
    }
  organizeHelper(dirPath,destPath)
}

function organizeHelper(src,dest){
  let childNames = fs.readdirSync(src)
 // console.log(childNmaes)


  for(let i=0 ; i < childNames.length; i++ )
  {
    let childAdress = path.join (src,childNames[i])
    let isFile = fs.lstatSync(childAdress).isFile()

    if(isFile == true)
    {
      let fileCategory = getCategory(childNames[i])

      console.log(childNames[i] + " belongs to " + fileCategory)

      sendFiles(childAdress , dest , fileCategory)

    }
  }
}

function getCategory(FileName){
  let ext = path.extname(FileName).slice(1)
 
 // console.log(ext)

 for (let key in types )
 {
  let cTypeArr = types [key]
   
 for (let i = 0; i < cTypeArr.length; i++)
 {
  if (ext == cTypeArr[i])
  {
    return key
  }
 } 
 }
 return "others"
}

 function sendFiles (srcFilePath , dest , fileCategory){
    // we will create path for each category type encountered to create folders of their names

  let catPath = path.join (dest , fileCategory)

    //D:\FJP4\test folder\organized_files\media
   //D:\FJP4 \test folder\organized_files\documents


  if (fs.existsSync(catPath) == false)
  {
    fs.mkdirSync (catPath)
  }

  let fileName = path.basename(srcFilePath)

  let destFilePath = path.join(catPath , fileName)

  fs.copyFileSync(srcFilePath , destFilePath)

  fs.unlinkSync (srcFilePath);

  console.log ("File Organized")
}

module.exports = {
   organizeFnKey : organizeFn
}