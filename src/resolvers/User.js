const Note = require("../models/note");

const notes = async (parent, _args) => {
  const notes = await Note.find({ userId: parent._id });
  if (!notes) {
    throw new Error("Note not found!");
  }

  return notes;
}

module.exports = {
  notes
}  