import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 200,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    imageId: {
      type: String,
      required: true,
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
  },
  { timestamps: true } //for createdAt and updatedAt
);

const User = mongoose.model("User", UserSchema);

export default User;
