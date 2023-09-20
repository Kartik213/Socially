import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../state/authSlice.js";
import Flexbetween from "./Flexbetween";
import UserImage from "./UserImage";
import url from "../url.js";
import { useState } from "react";
import {toast} from "react-toastify";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const [loading, setLoading] = useState(false);

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends? friends.find((friend) => {
    return friend._id === friendId;
  }):NULL;

  const patchFriend = async () => {
    setLoading(true);
    const response = await fetch(
      `${url}/users/${_id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ friends: data.friends }));
    if(response.ok){
      toast.success(data.message);
    }else{
      toast.error(data.message);
    }
    setLoading(false);
  };

  return (
    <Flexbetween>
      <Flexbetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0); // for page refreshing while jumping from one user to another
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight={"500"}
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </Flexbetween>
      {_id !== friendId && (
      <IconButton
        onClick={patchFriend}
        disabled={loading}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: loading ? "grey" : primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: loading ? "grey" : primaryDark }} />
        )}
      </IconButton>
      )}
    </Flexbetween>
  );
};

export default Friend;
