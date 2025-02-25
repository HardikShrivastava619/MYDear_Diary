import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    todayStory: {
      type: String,
      required: true,
    },
    special: {
      type: String,
      default: "nothing Special that day",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    photos: [ // Change 'photo' to 'photos' and make it an array
      {
        data: Buffer,
        contentType: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("entry", entrySchema);
