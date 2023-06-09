import { useEffect } from "react";
import axios from "axios";
import WidgetBox from "components/WidgetBox";
import { Typography, useMediaQuery, Box, Modal } from "@mui/material";
import FlexBox from "components/FlexBox";
import { useSelector } from "react-redux";
import UserProfilePhoto from "components/UserProfilePhoto";
import CheckIcon from "@mui/icons-material/Check";

const NotificationWidget = ({
  notifications,
  setIsNotificationWidget,
  isNotificationWidget,
}) => {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  // const notifications = useSelector((state)=>state.notifications);

  const deleteNotification = (notificationId) => {
    axios
      .patch(
        `http://localhost:8080/api/notifications/readOne/${notificationId}`
      )
      .then((res) => {
        console.log("from NotificationWidget", res);
      })
      .catch((err) => {
        console.log("from NotificationWidget", err);
      });
  };

  return (
    <Modal
      open={isNotificationWidget}
      onClose={() => setIsNotificationWidget(false)}
    >
      <WidgetBox m="5rem 6% 0 6%" position="fixed" width="88%" zIndex="10">
        <Typography textAlign="center" variant="h3" mb="1rem">
          Notifications
        </Typography>
        <FlexBox
          width="100%"
          flexDirection="column"
          height="500px"
          gap="1rem"
          overflow="auto"
        >
          {notifications.map((notification, i) => (
            //Flex box needs onClick if not friend /post/postid if not send to friend page '/profile/senderId
            <FlexBox
              key={i}
              width={isNonMobileScreens ? "42%" : "100%"}
              m="0 auto"
            >
              <FlexBox gap=".5rem">
                <UserProfilePhoto userPhoto={notification.sender.userPhoto} />
                <Typography>
                  {notification.sender.firstName} {notification.sender.lastName}
                </Typography>
              </FlexBox>
              {notification.type === "friend" ? (
                <Typography>Added you as a Friend</Typography>
              ) : notification.type === "likePost" ? (
                <Typography>Liked a post by you</Typography>
              ) : notification.type === "comment" ? (
                <Typography>Posted a comment on your post</Typography>
              ) : (
                <Typography>did something</Typography>
              )}
              <Typography>
                Mark as read <CheckIcon />
              </Typography>
            </FlexBox>
          ))}
        </FlexBox>
      </WidgetBox>
    </Modal>
  );
};

export default NotificationWidget;
