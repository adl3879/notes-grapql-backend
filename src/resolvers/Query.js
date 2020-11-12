const Note = require("../models/note");
const User = require("../models/user");

const note = async (_parent, args) => {
  const note = await Note.findById(args.id);
  if (!note) {
    throw new Error("Note doesn't exist");
  }

  return note;
}

const notes = async (_parent, _args) => {
  const notes = await Note.find({ archive: false, trash: false });
  if (!notes) {
    throw new Error("Empty");
  } 

  return notes;
}

const archive = async (_parent, _args) => {
  const archive = await Note.find({ archive: true });
  if(!archive) {
    throw new Error("archive is empty")
  }

  return archive;
}

const trash = async(_parent, _args) => {
  const trash = await Note.find({ trash: true });
  if(!trash) {
    throw new Error("trash is empty")
  }

  return trash;
}

const user = async (_parent, args) => {
  const user = await User.findById(args.id);
  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

const users = async (_parent, _args) => {
  const users = await User.find();
  if (!users) {
    throw new Error("Users not found");
  }

  return users;
}

module.exports = {
  note,
  notes,
  archive,
  trash,
  user,
  users
}