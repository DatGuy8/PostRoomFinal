import { Typography, useTheme } from "@mui/material";
import FlexBox from "components/FlexBox";
import WidgetBox from "components/WidgetBox";

const AdSpaceWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetBox>
      <FlexBox>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBox>
      <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:8080/images/rest2.jpg`}
        />
      <FlexBox>
        <Typography color={main}>Coffee and Bean</Typography>
        <Typography color={medium}>CoffeeAndBean.com</Typography>
      </FlexBox>
      <Typography color={medium} m='0.5rem 0'>
        For the freshest coffee in town!
      </Typography>
    </WidgetBox>
  );
};

export default AdSpaceWidget;
