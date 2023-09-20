// import express from "express";
// import bodyParser from "body-parser";
// import multer from "multer";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";
// import path from "path";
// import { fileURLToPath } from "url";

// import userRoutes from "./routes/users.js";
// import authRoutes from "./routes/auth.js";
// import postRoutes from "./routes/posts.js";
// import { register } from "./controllers/auth.js";
// import { verifyUser } from "./middleware/auth.js";
// import { createPost } from "./controllers/posts.js";
// import { storage } from "./cloudinaryConfig.js";

// import User from "./models/User.js";
// import Post from "./models/Post.js";
// import { users, posts } from "./data/index.js";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// dotenv.config();
// const app = express();

// // The express. json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// // Parameters: The options parameter have various property like inflate, limit, type, et
// app.use(express.json());
// // It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// // Morgan is a logging tool (middleware) that can be used in HTTP servers implemented using Express & Node.js.
// // It can be used to log requests, errors, and more to the console.
// app.use(morgan("common"));
// // body-parser
// // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// // bodyParser.json() --> Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
// // limit
// // Controls the maximum request body size. If this is a number, then the value specifies the number of bytes;
// // if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
// app.use(bodyParser.json({ limit: "30mb", extended: true }));
// // Returns middleware that only parses urlencoded bodies
// app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// // CORS is a security mechanism that allows a web page from one domain or Origin to access a resource with a different domain (a cross-domain request).
// app.use(cors());
// // defines the path where we store our images
// app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// // setting up file storage
// // Multer is a node. js middleware for handling multipart/form-data , which is primarily used for uploading files.
// // const storage = multer.diskStorage({
// //   destination: function (req, file, cb) {
// //     cb(null, "public/assets");
// //   },
// //   filename: function (req, file, cb) {
// //     cb(null, file.originalname);
// //   },
// // });
// const upload = multer({ storage });

// // setting up routes
// app.post("/auth/register",upload.single("picture") ,register);
// app.post("/posts", verifyUser, upload.single("picture"), createPost);

// app.use("/auth", authRoutes);
// app.use("/users", userRoutes);
// app.use("/posts", postRoutes);

// // setting up monogodb
// const PORT = process.env.PORT || 8080;
// mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server port ${PORT}`));
//     // User.insertMany(users);
//     // Post.insertMany(posts);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import multer from "multer";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; //middleware and package configurations
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cloudinary from "cloudinary";

/* CONFIGURATION */ const __filename = fileURLToPath(import.meta.url); //converts a url to a path string
const __dirname = path.dirname(__filename);
dotenv.config(); // to use .env files
const app = express();
app.use(express.json()); //parses incoming json requests and parse it to the req.body
app.use(helmet()); // secures HTTP header returned by the express app
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" })); // so that browser blocks no cors
app.use(morgan("common")); //it is used to log the requests with info in terminal
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
app.use("/assets", express.static(path.join(__dirname, "public/assets"))); //to store the images

/* ROUTES */

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server port ${PORT}`));
  })
  .catch((err) => {
    console.log(err);
  });