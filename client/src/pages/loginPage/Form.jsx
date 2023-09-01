import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import Flexbetween from "../../components/Flexbetween";
import { setLogin } from "../../state/authSlice.js";
import url from "../../url.js";

const registerSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
  location: yup.string().required("required"),
  occupation: yup.string().required("required"),
  picture: yup.string().required("required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialRegisterValue = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};
const initialLoginValue = {
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login");
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notMobile = useMediaQuery("(min-width: 600px)");

  const register = async (values, onSubmitProps) => {
    // this allows us to send image with form data
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);
    const registerUser = await fetch(
      `${url}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await registerUser.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const logInUser = await fetch(
      `${url}/auth/login`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const loggedIn = await logInUser.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (pageType === "login") {
      await login(values, onSubmitProps);
    } else {
      await register(values, onSubmitProps);
    }
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={
        pageType === "login" ? initialLoginValue : initialRegisterValue
      }
      validationSchema={pageType === "login" ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: notMobile ? undefined : "span 4" },
            }}
          >
            {pageType === "register" && (
              <>
                <TextField
                  label="First Name"
                  // handles things when we click out of the textfield
                  onBlur={handleBlur}
                  // handles thing when a change has occured
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  // if the textfield is touched and it have some error
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  // we will dispay the error if the field is touched and have error
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    // defines what type of files will be accepted
                    acceptedFiles=".jpg,.jpeg,.png, .jfif"
                    // multiple files or single file
                    multiple={false}
                    // what to do with the file
                    onDrop={(acceptedFiles) =>
                      // using formik we set the value for picture
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {/* if picture is not uploaded we will show add picture here else show file name */}
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <Flexbetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </Flexbetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": { color: palette.primary.main },
              }}
            >
              {pageType === "login" ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              onClick={() => {
                setPageType(pageType === "login" ? "register" : "login");
                resetForm();
              }}
              sx={{
                textDecoration: "underline",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  color: palette.primary.light,
                },
              }}
            >
              {pageType === "login"
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
