// firstName
// lastName
// email
// country
// city
// address
// password

import mongoose, { Schema, Document } from "mongoose";

interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  city: string;
  address: string;
  password: string;
  phone: string;
}

const userSchemas = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel =
  mongoose.models.user || mongoose.model<User>("user", userSchemas);

export default UserModel;
