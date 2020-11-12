const { signup, login } = require("./User");
const { processUpload } = require("../../utils");

const { 
  addNote,
  deleteNote,
  updateNote,
  archiveNote,
  trashNote,
  undoArchive,
  undoTrash
} = require("./Note");

const imageUpload = async (_parent, args) => {
  const upload = await processUpload(args.file);
  console.log(`localhost:4000/images/${upload.filename}`);
  return upload;
}

module.exports = {
  signup,
  login,
  addNote,
  deleteNote,
  updateNote,
  archiveNote,
  trashNote,
  undoArchive,
  undoTrash, 
  imageUpload
}
