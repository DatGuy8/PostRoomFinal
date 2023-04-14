import { PersonAddOutlined, PersonRemoveOutlined, EditOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBox from "./FlexBox";
import UserProfilePhoto from "./UserProfilePhoto";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setFriends } from "state/user";

const Friend = ({ friendPicture, friendLocation, name, friendId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFriend = true;
  // const isFriend = friends.length < 1 ? false : !!friends.find(friend => friend._id === friendId);
  const isUser = _id === friendId;

  const patchFriend = () => {
    axios.patch(`http://localhost:8080/api/users/${_id}/${friendId}`)
      .then((res) => {
        console.log(res.data);
        dispatch(setFriends({ friends: res.data }))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <FlexBox>
      <FlexBox gap="1rem">
        <UserProfilePhoto userPhoto={friendPicture} size="55px" />
        <Box>
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
          <Typography color={medium} fontSize="0.75rem" onClick={() => console.log(friends)}>
            {friendLocation}
          </Typography>
        </Box>
      </FlexBox>
      <IconButton
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isUser ? (
          <EditOutlined sx={{ color: primaryDark }} />
        ) : isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} onClick={patchFriend} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} onClick={patchFriend} />
        )}
      </IconButton>
    </FlexBox>
  );
};

export default Friend;
