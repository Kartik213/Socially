import mongoose from "mongoose";

// const commentSchema = new mongoose.Schema(
//   {
//     postId: {
//       type: String,
//       required: true,
//     },
//     userId: {
//       type: String,
//       required: true,
//     },
//     postUserId: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     name: {
//       type: String,
//       required: true,
//     },
//     location: {
//       type: String,
//       required: true,
//     },
//     userPicturePath: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    // comments: {
    //   type: [commentSchema],
    //   default: [],
    // },
    imageId: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
// export const Comment = mongoose.model("Comment", commentSchema);
export default Post;
