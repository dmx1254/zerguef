// models/category.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface Category extends Document {
  name: string;
  image: string;
  link: string;
  slug: string;
  description: string;
}

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware pour générer automatiquement le lien

const CategoryModel =
  mongoose.models.Category ||
  mongoose.model<Category>("Category", categorySchema);

export default CategoryModel;
