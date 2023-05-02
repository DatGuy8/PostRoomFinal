import { useEffect } from "react"
import axios from "axios";
import WidgetBox from "components/WidgetBox";
import { Typography, useMediaQuery } from "@mui/material";
import FlexBox from "components/FlexBox";

const NotificationWidget = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  useEffect(()=>{
    console.log("running");
  })

  return (
    <WidgetBox m="2rem 6% 0 6%" position="fixed" width="88%" zIndex="10" height="500px">
      <FlexBox>
        <Typography>Notifications</Typography>
      </FlexBox>
    </WidgetBox>
  )
}

export default NotificationWidget