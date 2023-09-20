import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "../../state/authSlice.js";
import { useNavigate } from "react-router-dom";
import Flexbetween from "../../components/Flexbetween.jsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos.js";

const Navbar = () => {
  const [isMenuToggled, setisMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const notMobile = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const neutralDark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Flexbetween padding="1rem 6%" backgroundColor={alt}>
      {/* logo */}
      <Flexbetween gap="1.75rem">
        {!notMobile && (
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>
        )}
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
        >
          Socially
        </Typography>
      </Flexbetween>
      {/* if the screen width is more than 1000px then display the icons in line else display a menu */}
      {notMobile ? (
        <Flexbetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />
            ) : (
              <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
            )}
          </IconButton>
          <Message sx={{ fontSize: "25px" }} />
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          {/* fullName and logout drop down menu */}
          <FormControl variant="standard" value={fullName}>
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              {/* <MenuItem value={fullName}>
                <Button onClick={()=>{
                  navigate(`/profile/${user?._id}`);
                }}>
                  {fullName}
                </Button>
              </MenuItem> */}
              <MenuItem value={fullName} 
                  onClick={() => {
                    navigate(`/profile/${user?._id}`);
                  }}
                >
                  {fullName}
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </Flexbetween>
      ) : (
        <IconButton onClick={() => setisMenuToggled(!isMenuToggled)}>
          <Menu />
        </IconButton>
      )}

      {/* if screen width is less than 1000px and menu icon is clicked then display the list items and a close button */}
      {!notMobile && isMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* close icon */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton onClick={() => setisMenuToggled(!isMenuToggled)}>
              <Close />
            </IconButton>
          </Box>

          {/* Menu items when the menu is clicked */}
          <Flexbetween
            flexDirection="column"
            justifyContent="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: neutralDark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            {/* fullName and logout drop down menu */}
            {/* <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              > */}
            <MenuItem value={fullName} 
                onClick={() => {
                  navigate(`/profile/${user?._id}`);
                }}
              >
                {fullName}
              {/* <Typography>{fullName}</Typography> */}
            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>
              Log Out
            </MenuItem>
            {/* </Select>
            </FormControl> */}
          </Flexbetween>
        </Box>
      )}
    </Flexbetween>
  );
};

export default Navbar;
