import axios from "axios";
import FlexBox from "components/FlexBox";
import WidgetBox from "components/WidgetBox";
import UserProfilePhoto from "components/UserProfilePhoto";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UserWidget = ({ userId, userPhoto }) => {
  const [user, setUser] = useState(null);
  const {palette} = useTheme();
  const navigate = useNavigate();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;
  

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/users/get/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log("UserWidget error", err);
      });
  }, []);

  if (!user) return null;
  const { firstName, lastName, location, userName, occupation, friends } = user;

  return (
    <WidgetBox>
      <FlexBox gap='0.5rem' pb="1.1rem" onClick={()=> navigate(`/profile/${userId}`)}>
        {/* FIRST ROW */}
        <FlexBox gap='1rem'>
          <UserProfilePhoto userPhoto={userPhoto} />
          <Typography variant="h4"
          color={dark}
          fontWeight={500}
          sx={{
            '&:hover': {
              color: palette.primary.light,
              cursor: "pointer"
            }
          }}
          >{firstName} {lastName}</Typography>
        </FlexBox>
        <EditOutlined />
      </FlexBox>
      <Divider />
      {/* SECOND ROW */}
      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
          <LocationOnOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{location}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem">
          <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
          <Typography color={medium}>{occupation}</Typography>
        </Box>
      </Box>
      <Divider />
    </WidgetBox>
  );
};

export default UserWidget;
