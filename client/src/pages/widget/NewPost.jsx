import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  LinearProgress,
  useMediaQuery,
} from "@mui/material";
import Flexbetween from "../../components/Flexbetween.jsx";
import Dropzone from "react-dropzone";
import UserImage from "../../components/UserImage.jsx";
import Boxwrapper from "../../components/Boxwrapper.jsx";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/authSlice.js";
import url from "../../url.js";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

const NewPost = ({ picturePath }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const [loading, setLoading] = useState(false);
  const { palette } = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const notMobile = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${url}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    console.log(response);
     const data = await response.json();

     const postsResponse = await fetch(
       `${url}/posts`,
       {
         method: "GET",
         headers: { Authorization: `Bearer ${token}` },
       }
     );
     const posts = await postsResponse.json();

    // const posts = await response.json();
    dispatch(setPosts({ posts: posts.posts }));
    // navigate(0);
    setImage(null);
    setPost("");
    setLoading(false);
    if (response.ok) {
      toast.success(posts.message);
    } else {
      toast.error(posts.message);
    }

  };

  return (
    <Boxwrapper mb={2}>
      <Flexbetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </Flexbetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <Flexbetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <Flexbetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </Flexbetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </Flexbetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <Flexbetween mb={loading ? 1 : 0}>
        <Flexbetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </Flexbetween>

        {/* {notMobile ? (
          <>
            <Flexbetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </Flexbetween>

            <Flexbetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </Flexbetween>

            <Flexbetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </Flexbetween>
          </>
        ) : (
          <Flexbetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </Flexbetween>
        )} */}

        <Button
          disabled={!post || loading}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
            "&:disabled": {
              backgroundColor: palette.neutral.light
            }
          }}
        >
          POST
        </Button>
      </Flexbetween>
      {loading && <LinearProgress/> }
    </Boxwrapper>
  );
};

export default NewPost;
