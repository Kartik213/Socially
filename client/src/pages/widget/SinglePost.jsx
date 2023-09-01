import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import Flexbetween from "../../components/Flexbetween";
import Friend from "../../components/Friend";
import Boxwrapper from "../../components/Boxwrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../state/authSlice.js";
import url from "../../url.js";

const SinglePost = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  // let isLiked = Boolean(likes[loggedInUserId]);
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  // const likeCount = Object.keys(likes).length;
  const [likeCount, setLikeCount] = useState(
    Number(Object.keys(likes).length)
  );
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const patchLike = async () => {
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    setIsLiked(!isLiked);
    const response = await fetch(
      `${url}/posts/${postId}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );
    const updatedPost = await response.json();
    dispatch(setPost({ post: updatedPost }));
  };

  return (
    <Boxwrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`${url}/assets/${picturePath}`}
        />
      )}
      <Flexbetween mt="0.25rem">
        <Flexbetween gap="1rem">
          <Flexbetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </Flexbetween>

          <Flexbetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Flexbetween>
        </Flexbetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </Flexbetween>
      {isComments && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <Box key={`${name}-${i}`}>
              <Divider />
              <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem" }}>
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </Boxwrapper>
  );
};

export default SinglePost;
