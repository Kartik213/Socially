import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import Form from "./Form.jsx";

const Login = () => {
  const theme = useTheme();
  const notMobile = useMediaQuery("(min-width: 1000px)");
  return (
    <Box>
      {/* header with logo */}
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Socially
        </Typography>
      </Box>
      {/* login form */}
      <Box
        width={notMobile ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Socially guys!!
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default Login;
