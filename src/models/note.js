const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    imageUrl: { type: String, required: false },
    title: { type: String, required: false },
    content: { type: String, required: true },
    pinned: { type: Boolean, required: true },
    color: { type: String, required: false },
    trash: { type: Boolean, required: true },
    archive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
 