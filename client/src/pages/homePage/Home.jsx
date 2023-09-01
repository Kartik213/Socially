import React from "react";
import Navbar from "../navbar/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserSection from "../widget/UserSection.jsx";
import NewPost from "../widget/NewPost.jsx";
import Feed from "../widget/Feed";
import Advertisment from "../widget/Advertisment";
import FriendList from "../widget/FriendList";

const Home = () => {
  const notMobile = useMediaQuery("(min-width: 1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={notMobile ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={notMobile ? "26%" : undefined}>
          <UserSection userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={notMobile ? "42%" : undefined}
          mt={notMobile ? undefined : "2rem"}
        >
          <NewPost picturePath={picturePath} />
          <Feed userId={_id} />
        </Box>
        {notMobile && (
          <Box flexBasis="26%">
            <Advertisment />
            <Box m="2rem 0" />
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
