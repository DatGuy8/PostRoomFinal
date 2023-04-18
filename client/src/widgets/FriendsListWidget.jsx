import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends } from "state/user";
import Friend from "components/Friend";
import WidgetBox from "components/WidgetBox";
import { Box, Typography,useTheme } from "@mui/material";

const FriendsListWidget = ({}) => {
  const { _id } = useSelector((state) => state.user);
  const friends = useSelector((state) => state.friends);
  const dispatch = useDispatch();
  const { palette } = useTheme();
  
  useEffect(()=>{
    axios.get(`http://localhost:8080/api/users/friends/${_id}`)
    .then((res)=>{
      dispatch(setFriends({friends: res.data}))
    })
    .catch((err)=>{
      console.log('friendsListWidget error', err);
    })
  },[])

  if(!friends) return null;

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
        {friends.map((friend) => (
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
