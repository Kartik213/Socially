import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cloudinary from "cloudinary";

const __filename = fileURLToPath(import.meta.url); //converts a url to a path string
const __dirname = path.dirname(__filename);
dotenv.config(); // to use .env files
const app = express();

// The express. json() function is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser.
// Parameters: The options parameter have various property like inflate, limit, type, et
app.use(express.json());
// It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards
app.use(helmet());
// Browser blocks no cors
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// Morgan is a logging tool (middleware) that can be used in HTTP servers implemented using Express & Node.js.
// It can be used to log requests, errors, and more to the console.
app.use(morgan("common"));
// body-parser
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// bodyParser.json() --> Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.
// limit
// Controls the maximum request body size. If this is a number, then the value specifies the number of bytes;
// if it is a string, the value is passed to the bytes library for parsing. Defaults to '100kb'.
app.use(bodyParser.json({ limit: "30mb", extended: true }));
// Returns middleware that only parses urlencoded bodies
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// CORS is a security mechanism that allows a web page from one domain or Origin to access a resource with a different domain (a cross-domain request).
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

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