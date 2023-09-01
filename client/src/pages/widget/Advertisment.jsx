import { Typography, useTheme } from "@mui/material";
import Flexbetween from "../../components/Flexbetween";
import Boxwrapper from "../../components/Boxwrapper";
import url from "../../url.js";


const Advertisment = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <Boxwrapper>
      <Flexbetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </Flexbetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src={`${url}/assets/info4.jpeg`}
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <Flexbetween>
        <Typography color={main}>MikaCosmetics</Typography>
        <Typography color={medium}>mikacosmetics.com</Typography>
      </Flexbetween>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </Boxwrapper>
  );
};

export default Advertisment;
