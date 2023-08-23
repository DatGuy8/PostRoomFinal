import axios from "axios";
import WidgetBox from "components/WidgetBox";
import {
    Typography,
    useMediaQuery,
    Modal,
    Button,
    useTheme,
    Box,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import { useSelector } from "react-redux";
import UserProfilePhoto from "components/UserProfilePhoto";
import { useDispatch } from "react-redux";
import { setNotifications } from "state/user";
import { useNavigate } from "react-router-dom";

const NotificationWidget = ({
    setIsNotificationWidget,
    isNotificationWidget,
    userId,
}) => {
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
    const token = useSelector((state) => state.token);
    const dispatch = useDispatch();
    const notifications = useSelector((state) => state.notifications);
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const navigate = useNavigate();

    const deleteNotification = (notificationId) => {
        console.log(notificationId);
        axios
            .patch(
                `http://localhost:8080/api/notifications/delete/${notificationId}`,
                { notificationId: notificationId, userId: userId },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                dispatch(setNotifications({ notifications: res.data }));
            })
            .catch((err) => {
                console.log("from NotificationWidget", err);
            });
    };

    const navigateLinks = (id, type = "") => {
        console.log(id);
        if (type === "profile") {
            navigate(`/profile/${id}`);
        } else {
            navigate(`/post/${id}`);
        }
        setIsNotificationWidget(!isNotificationWidget);
    };

    return (
        <Modal
            open={isNotificationWidget}
            onClose={() => setIsNotificationWidget(false)}
        >
            <WidgetBox
                m="5rem 6% 0 6%"
                position="fixed"
                width="88%"
                zIndex="10"
            >
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
                    {notifications.length === 0 ? (
                        <Typography>No Notifications</Typography>
                    ) : (
                        notifications.map((notification, i) => (
                            //Flex box needs onClick if not friend /post/postid if not send to friend page '/profile/senderId
                            <FlexBox
                                key={i}
                                width={isNonMobileScreens ? "42%" : "100%"}
                                m="0 auto"
                            >
                                <FlexBox gap=".5rem">
                                    <Box
                                        sx={{
                                            "&:hover": {
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() =>
                                            navigateLinks(
                                                notification.sender._id,
                                                "profile"
                                            )
                                        }
                                    >
                                        <UserProfilePhoto
                                            userPhoto={
                                                notification.sender.userPhoto
                                            }
                                        />
                                    </Box>

                                    <Typography
                                        color={main}
                                        variant="h5"
                                        fontWeight={500}
                                        sx={{
                                            "&:hover": {
                                                color: palette.primary.light,
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() =>
                                            navigateLinks(
                                                notification.sender._id,
                                                "profile"
                                            )
                                        }
                                    >
                                        {notification.sender.firstName}{" "}
                                        {notification.sender.lastName}
                                    </Typography>
                                </FlexBox>

                                {/* TYPE OF NOTIFICATION */}
                                {notification.type === "friend" ? (
                                    <Typography
                                        color={main}
                                        variant="h5"
                                        fontWeight={500}
                                        sx={{
                                            "&:hover": {
                                                color: palette.primary.light,
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() =>
                                            navigateLinks(
                                                notification.sender._id,
                                                "profile"
                                            )
                                        }
                                    >
                                        Added you as a Friend
                                    </Typography>
                                ) : notification.type === "likePost" ? (
                                    // <Link
                                    //     to={`/post/${notification.post}`}
                                    //     style={{ textDecoration: "none" }}
                                    // >
                                    <Typography
                                        color={main}
                                        variant="h5"
                                        fontWeight={500}
                                        sx={{
                                            "&:hover": {
                                                color: palette.primary.light,
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() =>
                                            navigateLinks(notification.post)
                                        }
                                    >
                                        Liked a post by you
                                    </Typography>
                                ) : notification.type === "comment" ? (
                                    <Typography
                                        color={main}
                                        variant="h5"
                                        fontWeight={500}
                                        sx={{
                                            "&:hover": {
                                                color: palette.primary.light,
                                                cursor: "pointer",
                                            },
                                        }}
                                        onClick={() =>
                                            navigateLinks(notification.post)
                                        }
                                    >
                                        Posted a comment on your post
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                                <Button
                                    onClick={() =>
                                        deleteNotification(notification._id)
                                    }
                                >
                                    Delete
                                </Button>
                            </FlexBox>
                        ))
                    )}
                </FlexBox>
            </WidgetBox>
        </Modal>
    );
};

export default NotificationWidget;
