import Navbar from "../navbar/Navbar";
import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import UserSection from "../widget/UserSection.jsx";
import NewPost from "../widget/NewPost.jsx";
import Feed from "../widget/Feed.jsx";
import FriendList from "../widget/FriendList.jsx";

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
          <Feed userId={_id} isProfile={false} />
        </Box>
        {notMobile && (
          <Box flexBasis="26%">
            <FriendList userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Home;
