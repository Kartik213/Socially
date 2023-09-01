import mongoose from "mongoose";

const userSchema = mongoose.Schema({
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
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 7,
  },
  friends: {
    type: Array,
    default: [],
  },
  picturePath: {
    type: String,
    default: " ",
  },
  location: String,
  occupation: String,
}, { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
