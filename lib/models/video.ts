// models/category.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface Video extends Document {
  data: string;
  contentType: string;
}

const videoSchema = new Schema(
  {
    data: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware pour générer automatiquement le lien

const VideoModel =
  mongoose.models.video || mongoose.model<Video>("video", videoSchema);

export default VideoModel;
