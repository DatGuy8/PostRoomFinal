import { PersonAddOutlined, PersonRemoveOutlined,EditOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FlexBox from "./FlexBox";
import UserProfilePhoto from "./UserProfilePhoto";
import { useNavigate } from "react-router-dom";

const Friend = ({ friendPicture, friendLocation, name, friendId }) => {
  const navigate = useNavigate();
  const {_id} = useSelector((state)=> state.user);

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = true;
  const isUser = _id === friendId;

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
          <Typography color={medium} fontSize="0.75rem">
            {friendLocation}
          </Typography>
        </Box>
      </FlexBox>
      <IconButton
        onClick={() => {}}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isUser ? (
          <EditOutlined sx={{ color: primaryDark }}/>
        ) : isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBox>
  );
};

export default Friend;
