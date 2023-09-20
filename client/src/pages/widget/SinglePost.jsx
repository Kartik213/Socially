import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Typography, useTheme } from "@mui/material";
import Flexbetween from "../../components/Flexbetween";
import Friend from "../../components/Friend";
import Boxwrapper from "../../components/Boxwrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setPost } from "../../state/authSlice.js";
import url from "../../url.js";
import { toast } from "react-toastify";
import Loader from "react-js-loader";

const SinglePost = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  // comments,
}) => {
  // const [isComments, setIsComments] = useState(false);
  const dispatch = useDispatch();
  // const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const [isLiked, setIsLiked] = useState(Boolean(likes[loggedInUserId]));
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [likeCount, setLikeCount] = useState(
    Number(Object.keys(likes).length)
  );
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const dark = palette.neutral.dark;

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
  const handleDelete = async () => {
    setIsLoading(true);
    const response = await fetch(`${url}/posts/${postId}/deletePost`, {
      method: "DELETE",
    });
    if (response.ok) {
      navigate(0);
      toast.success("Post Deleted");
    } else {
      toast.error("An error occured.");
    }
    setIsLoading(false);
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
          src={picturePath}
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

          {/* <Flexbetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </Flexbetween> */}
        </Flexbetween>

        {loggedInUserId === postUserId && (
          <IconButton
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <Flexbetween>
              <DeleteIcon />
              <Typography>DELETE POST</Typography>
            </Flexbetween>
          </IconButton>
        )}
      </Flexbetween>
      <Dialog
        fullWidth
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle id="alert-delete-title">Delete Post?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click on Confirm to delete your post.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <Loader type="box-up" bgColor={dark} color={dark} size={80} />
          ) : (
            <IconButton
              onClick={handleDelete}
            >
              <Flexbetween>
                <DeleteIcon />
                <Typography>CONFIRM</Typography>
              </Flexbetween>
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <Flexbetween>
              <Typography>CANCEL</Typography>
            </Flexbetween>
          </IconButton>
        </DialogActions>
      </Dialog>
    </Boxwrapper>
  );
};

export default SinglePost;
