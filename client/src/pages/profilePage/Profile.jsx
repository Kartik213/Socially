import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import FriendList from "../widget/FriendList.jsx";
import NewPost from "../widget/NewPost.jsx";
import Feed from "../widget/Feed.jsx";
import UserSection from "../widget/UserSection";
import url from "../../url.js";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const notMobile = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    const response = await fetch(`${url}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser(); // eslint-disable-next-line
  }, []);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={notMobile ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={notMobile ? "26%" : undefined}>
          <UserSection userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box
          flexBasis={notMobile ? "42%" : undefined}
          mt={notMobile ? undefined : "2rem"}
        >
          <NewPost picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <Feed userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
