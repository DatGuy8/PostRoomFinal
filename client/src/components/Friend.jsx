import {
  PersonAddOutlined,
  PersonRemoveOutlined,
  
} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBox from "./FlexBox";
import UserProfilePhoto from "./UserProfilePhoto";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { emitNotification, setFriends } from "state/user";


const Friend = ({
  friendPicture,
  friendLocation,
  name,
  friendId,
  userName,
  isProfilePage = false,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const token = useSelector((state) => state.token);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = Array.isArray(friends)
    ? friends.some((friend) => friend._id === friendId)
    : false;

  const isUser = _id === friendId;

  const patchFriend = () => {
    axios
      .patch(
        `http://localhost:8080/api/users/${friendId}/friends`,
        { userId: _id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // console.log(res.data);
        dispatch(setFriends(res.data));
        dispatch(emitNotification({targetUserName: userName}));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <FlexBox>
      <FlexBox gap="1rem">
        <UserProfilePhoto userPhoto={friendPicture} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
          }}
        >
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
          >
            {name}
          </Typography>
          <Typography
            color={medium}
            fontSize="0.75rem"
          >
            {friendLocation}
          </Typography>
        </Box>
      </FlexBox>

      {/* IF PROFILE PAGE RETURN NOTHING */}
      {isProfilePage || isUser ? null : (
        <IconButton
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          onClick={() => patchFriend()}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
    </FlexBox>
  );
};

export default Friend;
