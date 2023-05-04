import { useEffect } from "react";
import axios from "axios";
import WidgetBox from "components/WidgetBox";
import { Typography, useMediaQuery, Box } from "@mui/material";
import FlexBox from "components/FlexBox";
import { useSelector } from "react-redux";
import UserProfilePhoto from "components/UserProfilePhoto";

const NotificationWidget = ({ notifications }) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const notifications = useSelector((state)=>state.notifications);

  return (
    <WidgetBox m="2rem 6% 0 6%" position="fixed" width="88%" zIndex="10">
      <FlexBox
        width="100%"
        flexDirection="column"
        height="500px"
        gap="1rem"
        overflow="auto"
      >
        <Typography textAlign="center">Notifications</Typography>
        {notifications.map((notification, i) => (
          //Flex box needs onClick if not friend /post/postid if not send to friend page '/profile/senderId
          <FlexBox
            key={i}
            width={isNonMobileScreens ? "42%" : "100%"}
            m="0 auto"
          >
            <UserProfilePhoto userPhoto={notification.sender.userPhoto} />
            <Typography>{notification.sender.firstName}</Typography>
            {notification.type === "friend" ? (
              <Typography>Added you as a Friend</Typography>
            ) : (
              <Typography>{notification.type}</Typography>
            )}
          </FlexBox>
        ))}
      </FlexBox>
    </WidgetBox>
  );
};

export default NotificationWidget;
