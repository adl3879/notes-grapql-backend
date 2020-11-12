const fs = require("fs");
const Note = require("../../models/note");
const { processUpload } = require("../../utils");
// const imagesPath = require("../../../images");

//add
const addNote = async (_parent, args, ctx) => {
 if (ctx && ctx.authError && ctx.authError.length > 0)
    throw new Error(ctx.authError);

  const { filename } = await processUpload(args.image);

  const note = await new Note({
    userId: ctx.userId,
    imageUrl: `localhost:4000/images/${filename}`,
    title: args.title,
    content: args.content,
    color: args.color,
    pinned: args.pinned,
    trash: false,
    archive: false,
  }).save();

  return note;
}

//remove
const deleteNote = async (_parent, args, ctx) => {
 if (ctx && ctx.authError && ctx.authError.length > 0)
    throw new Error(ctx.authError);

  const note = await Note.findOne({ _id: args.id });
  if (!note) {
    throw new Error("note not found");
  }

  const filename = note.imageUrl.split("/images/")[1]; 
  fs.unlinkSync("../images/" + filename);

  return note.remove();
}

//update
const updateNote = async (_parent, args, ctx) => {
  if (ctx && ctx.authError && ctx.authError.length > 0)
    throw new Error(ctx.authError);
 
  const update = {};
  update.title = args.title;
  update.content = args.content;
  update.color = args.color;
  update.pinned = args.pinned;

  const updatedNote = await Note.findOneAndUpdate({ _id: args.id }, update);

  return updatedNote;
}


//archive
const archiveNote = async (_parent, args, ctx) => {
 if (ctx && ctx.authError && ctx.authError.length > 0)
    throw new Error(ctx.authError);

  const note = {};
  note.archive = true;

  const archiveNote = await Note.findOneAndUpdate({ _id: args.id }, note);

  return archiveNote;
}

//undo-archive
const undoArchive = async (_parent, args, ctx) => {
 if (ctx && ctx.authError && ctx.authError.length > 0)
    throw new Error(ctx.authError);

  const undo = {};
  undo.archive = false;

  const undoArchive = await Note.findByIdAndUpdate(args.id, undo);

  return undoArchive;
}


//trash
const trashNote = async (_parent, args, ctx) => {
 if (ctx && ctx.authError && ctx.authError.length > 0)
    throw new Error(ctx.authError);

  const trash = {};
  trash.trash = true;

  const trashNote = await Note.findByIdAndUpdate(args.id, trash);

  return trashNote;
}

//undo-trash
const undoTrash = async (_parent, args, ctx) => {
 if (ctx && ctx.authError && ctx.authError.length > 0)
    throw new Error(ctx.authError);

  const undo = {};
  undo.trash = false;

  const undoTrash = await Note.findByIdAndUpdate(args.id, undo);

  return undoTrash;
}

//exports
exports.addNote = addNote;
exports.deleteNote = deleteNote;
exports.updateNote = updateNote;
exports.archiveNote = archiveNote;
exports.undoArchive = undoArchive;
exports.trashNote = trashNote;
exports.undoTrash = undoTrash;