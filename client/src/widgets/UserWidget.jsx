import axios from "axios";
import FlexBox from "components/FlexBox";
import WidgetBox from "components/WidgetBox";
import UserProfilePhoto from "components/UserProfilePhoto";
import {
    Box,
    Typography,
    Divider,
    useTheme,
    IconButton,
    Button,
} from "@mui/material";
import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    DeleteOutlined,
    PersonRemoveOutlined,
    PersonAddOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Dropzone from "react-dropzone";
import { setUpdateUser, setFriends, emitNotification, setPosts } from "state/user";

const UserWidget = ({ userId, userPhoto,userPage="false" }) => {
    const [user, setUser] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const [addFriend, setAddFriend] = useState(false);
    const [addUserPhoto, setAddUserPhoto] = useState(null);
    const navigate = useNavigate();
    const { _id } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const { palette } = useTheme();
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    const isUser = userId === _id;

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/users/get/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setUser(res.data);
                console.log("1");
            })
            .catch((err) => {
                console.log("UserWidget error", err);
            });
    }, [userId, addFriend,token]);

    if (!user) return null;
    const { firstName, lastName, location, userName, occupation, friends } =
        user;

    const patchFriend = () => {
        axios
            .patch(
                `http://localhost:8080/api/users/${userId}/friends`,
                { userId: _id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                console.log(res.data);
                dispatch(setFriends(res.data));
                dispatch(emitNotification({ targetUserName: userName }));
                setAddFriend(!addFriend);
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleUserPhoto = () => {
        const imageForm = new FormData();
        imageForm.append("photo", addUserPhoto);
        console.log(userPage);
        axios
            .patch(
                `http://localhost:8080/api/users/changephoto/${_id}/${userPage}`,
                imageForm,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                // console.log("user added photo", res);
                dispatch(setUpdateUser({ user: res.data.user }));
                dispatch(setPosts({posts: res.data.posts}))
                
                setAddUserPhoto(null);
                setIsImage(false);
                
            })
            .catch((err) => {
                console.log("edit user photo", err);
            });
    };

    const isFriend = Array.isArray(friends)
        ? friends.some((friend) => friend === _id)
        : false;
    

    return (
        <WidgetBox>
            <FlexBox gap="0.5rem" pb="1.1rem">
                {/* FIRST ROW */}
                <FlexBox
                    gap="1rem"
                    onClick={() => navigate(`/profile/${userId}`)}
                >
                    <UserProfilePhoto userPhoto={userPhoto} />
                    <Typography
                        variant="h4"
                        color={dark}
                        fontWeight={500}
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            },
                        }}
                    >
                        {firstName} {lastName}
                    </Typography>
                </FlexBox>
                {isUser ? (
                    <IconButton onClick={() => setIsImage(!isImage)}>
                        <ManageAccountsOutlined />
                    </IconButton>
                ) : isFriend ? (
                    <IconButton onClick={() => patchFriend()}>
                        <PersonRemoveOutlined sx={{ color: dark }} />
                    </IconButton>
                ) : (
                    <IconButton onClick={() => patchFriend()}>
                        <PersonAddOutlined sx={{ color: dark }} />
                    </IconButton>
                )}
            </FlexBox>
            <Divider />

            {isImage && (
                <Box
                    border={`1px solid ${medium}`}
                    borderRadius="5px"
                    mt="1rem"
                    p="1rem"
                >
                    <Dropzone
                        acceptedFiles=".jpeg,.jpg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) =>
                            setAddUserPhoto(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps }) => (
                            <FlexBox>
                                <Box
                                    {...getRootProps()}
                                    border={`2px dashed ${palette.primary.main}`}
                                    padding="1rem"
                                    width="100%"
                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                >
                                    <input {...getInputProps()} />
                                    {!addUserPhoto ? (
                                        <p>Change User Photo Here</p>
                                    ) : (
                                        <FlexBox>
                                            <Typography>
                                                {addUserPhoto.name}
                                            </Typography>
                                            <EditOutlined />
                                        </FlexBox>
                                    )}
                                </Box>
                                {addUserPhoto && (
                                    <>
                                        <IconButton
                                            onClick={() =>
                                                setAddUserPhoto(null)
                                            }
                                            sx={{ width: "15%" }}
                                        >
                                            <DeleteOutlined />
                                        </IconButton>
                                        <Button
                                            disabled={!addUserPhoto}
                                            onClick={handleUserPhoto}
                                        >
                                            Change User Photo
                                        </Button>
                                    </>
                                )}
                            </FlexBox>
                        )}
                    </Dropzone>
                </Box>
            )}
            {/* SECOND ROW */}
            <Box p="1rem 0">
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" sx={{ color: main }} />
                    <Typography color={medium}>{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem">
                    <WorkOutlineOutlined
                        fontSize="large"
                        sx={{ color: main }}
                    />
                    <Typography color={medium}>{occupation}</Typography>
                </Box>
            </Box>
            <Divider />
        </WidgetBox>
    );
};

export default UserWidget;
