import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const file = req.file;
    const fileUrl = getDataUri(file);
    const cloudUri = await cloudinary.uploader.upload(fileUrl.content);

    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt(); //it provides a random salt, i.e., number of rounds of hashing
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: cloudUri.secure_url,
      imageId: cloudUri.public_id,
      friends,
      location,
      occupation,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    res.status(201).json(savedUser); // 201 -> data created
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user)
      return res.status(400).json({ message: "User does not exists." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET); // sign the token with user id and use a key JWT_SECRET
    delete user.password; // so that it is not sent back to frontend in res
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
