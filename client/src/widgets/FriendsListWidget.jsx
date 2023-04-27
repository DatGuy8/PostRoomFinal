import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state/user";
import Friend from "components/Friend";
import WidgetBox from "components/WidgetBox";
import { Box, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";

const FriendsListWidget = ({ friendId, isProfilePage = false }) => {
  const [friendsFriends, setFriendsFriends] = useState([]);
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  let friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const isUser = _id === friendId;

  const getUserFriends = () => {
    axios
      .get(`http://localhost:8080/api/users/friends/${_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        dispatch(setFriends({ friends: res.data }));
      })
      .catch((err) => {
        console.log("friendsList", err);
      });
  };

  const getProfilePageFriends = () => {
    axios
      .get(`http://localhost:8080/api/users/friends/${friendId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFriendsFriends(res.data);
      })
      .catch((err) => {
        console.log("friendsList", err);
      });
  };

  useEffect(() => {
    if (isProfilePage) {
      getProfilePageFriends();
    } else {
      getUserFriends();
    }
  }, [friendId]);

  // if (!friends && !friendsFriends) return null;

  return (
    <WidgetBox>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight={500}
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {isProfilePage
          ? friendsFriends?.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                friendLocation={friend.location}
                friendPicture={friend.userPhoto}
                isProfilePage={isUser? false : true}
              />
            ))
          : friends?.map((friend) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={`${friend.firstName} ${friend.lastName}`}
                friendLocation={friend.location}
                friendPicture={friend.userPhoto}
              />
            ))}
      </Box>
    </WidgetBox>
  );
};

export default FriendsListWidget;
