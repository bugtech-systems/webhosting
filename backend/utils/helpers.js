const fs = require('fs')
let excludeFolders = ['node_modules', '.git', 'uploads', 'client'];


// Recursive function to get files
function getFiles(dir, files = []) {
  // Get an array of all files and directories in the passed directory using fs.readdirSync
  const fileList = fs.readdirSync(dir)
  // Create the full path of the file/directory by concatenating the passed directory and file/directory name
  for (const file of fileList) {
    const name = `${dir}/${file}`
    console.log(file)
    // Check if the current file/directory is a directory using fs.statSync
    if (fs.statSync(name).isDirectory() && !excludeFolders.includes(file)) {
      // If it is a directory, recursively call the getFiles function with the directory path and the files array
      files.push(name)
      getFiles(name, files)
    }
  }
  return files
}



module.exports = {
    getFiles: getFiles
}