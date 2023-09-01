import { Box } from "@mui/material";
import { styled } from "@mui/system";

// styled component
// usefull when we have to use same style multiple time

const Flexbetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default Flexbetween;
