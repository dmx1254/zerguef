// models/product.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface ProductDetails {
  material?: string;
  origin: string;
  care?: string;
  sizes?: string[];
}

interface Product extends Document {
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  details: ProductDetails;
  discount?: number;
  stock: number;
  
}

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  details: {
    material: {
      type: String,
      required: false,
    },
    origin: {
      type: String,
      required: true,
    },
    care: {
      type: String,
      required: false,
    },
    sizes: {
      type: [String],
      required: false,
    },
  },
  discount: {
    type: Number,
    required: false,
    min: 0,
    max: 100,
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  }
}, {
  timestamps: true
});

const ProductModel = mongoose.models.Product || mongoose.model<Product>("Product", productSchema);

export default ProductModel;