import { Box, CircularProgress, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../navbar/Navbar.jsx";
import FriendList from "../widget/FriendList.jsx";
import NewPost from "../widget/NewPost.jsx";
import Feed from "../widget/Feed.jsx";
import UserSection from "../widget/UserSection";
import url from "../../url.js";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();
  const {_id} = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const notMobile = useMediaQuery("(min-width:1000px)");

  const getUser = async () => {
    setLoading(true);
    const response = await fetch(`${url}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if(!response.ok){
      toast.error(data.message);
      return ;
    }
    setUser(data);
    setLoading(false);
  };

  useEffect(() => {
    getUser(); // eslint-disable-next-line
  }, []);

  if(loading){
    return (
      <Box
        width="100%"
        height="100%"
        m="1rem auto"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!user && !loading) return null;

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
          <UserSection userId={userId} picturePath={user?.picturePath} />
          <Box m="2rem 0" />
          <FriendList userId={userId} />
        </Box>
        <Box
          flexBasis={notMobile ? "42%" : undefined}
          mt={notMobile ? undefined : "2rem"}
        >
          <NewPost picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <Feed userId={userId} isProfile={true} />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
