import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/authSlice.js";
import SinglePost from "./SinglePost";
import url from "../../url.js";
import Boxwrapper from "../../components/Boxwrapper.jsx";
import {Box, CircularProgress, Typography } from "@mui/material";
import {useTheme} from "@mui/material";

const Feed = ({ userId, isProfile }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const theme = useTheme();

  const getPosts = async () => {
    setLoading(true);
    const response = await fetch(`${url}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data.posts }));
    setLoading(false);
  };

  const getUserPosts = async () => {
    setLoading(true);
    const response = await fetch(
      `${url}/posts/${userId}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data.posts }));
    setLoading(false);
  };
  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  if (loading && posts.length === 0) {
    return (
      <Box
        width={"100%"}
        m="1rem auto"
        display="flex"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (posts.length === 0) {
    return (
      <Boxwrapper m="2rem 0">
        <Typography
          variant="h2"
          textAlign={"center"}
          p="2rem 0"
          sx={{ color: theme.palette.neutral.medium }}
        >
          No Posts
        </Typography>
      </Boxwrapper>
    );
  }
  else{
    return (
      <>
        {posts.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            description,
            location,
            picturePath,
            userPicturePath,
            likes,
            // comments,
          }) => (
            <SinglePost
              key={_id}
              postId={_id}
              postUserId={userId}
              name={`${firstName} ${lastName}`}
              description={description}
              location={location}
              picturePath={picturePath}
              userPicturePath={userPicturePath}
              likes={likes}
              // comments={comments}
            />
          )
        )}
      </>
    );
  }
};

export default Feed;
