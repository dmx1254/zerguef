// order.model.ts
import mongoose, { Schema, Document } from "mongoose";

interface CartItem extends Document {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  volume?: string;
  size?: string;
}

interface Order extends Document {
  orderNumber: string;
  userId: mongoose.Schema.Types.ObjectId;
  items: CartItem[];
  total: number;
  shipping: number;
  paymentMethod: "card" | "cash";
  status: "pending" | "processing" | "completed" | "cancelled";
}

const cartItemSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
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
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  size: {
    type: String,
    required: false,
  },
  volume: {
    type: String,
    required: false,
  },
});

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [cartItemSchema],
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    shipping: {
      type: Number,
      required: true,
      default: 30,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed", "cancelled"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Génération automatique du numéro de commande

const OrderModel =
  mongoose.models.Order || mongoose.model<Order>("Order", orderSchema);

export default OrderModel;
