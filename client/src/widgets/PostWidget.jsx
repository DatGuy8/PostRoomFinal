import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
  SendIcon,
} from "@mui/icons-material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  InputBase,
  Button,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import Friend from "components/Friend";
import axios from "axios";
import WidgetBox from "components/WidgetBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state/user";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  title,
  postId,
  postUserId,
  photo,
  comments,
  likes,
  postUserPicture,
  postUserFullName,
  postUserLocation,
  createdAt,
}) => {
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  const commentTime = (time) => {
    const currentDate = moment();
    const postDate = moment(time);
    const timeDifference = postDate.fromNow();
    const isMoreThanTwoDaysAgo = postDate.isBefore(
      currentDate.subtract(2, "days")
    );
    return isMoreThanTwoDaysAgo
      ? postDate.format("MM/D/YY")
      : timeDifference;
  };

  const postedTime = (time) => {
    return moment(new Date(time)).format("h:mm a on MM/DD/YY ");
  };

  const patchLike = () => {
    axios
      .patch(
        `http://localhost:8080/api/posts/like/${postId}`,
        { userId: loggedInUserId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setPost({ post: res.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addComment = (e) => {
    e.preventDefault();
    const commentForm = { comment };
    axios
      .post(
        `http://localhost:8080/api/comments/${loggedInUserId}/comments/${postId}`,
        commentForm,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(setPost({ post: res.data }));
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <WidgetBox m="2rem 0">
      <Friend
        friendId={postUserId}
        name={postUserFullName}
        friendLocation={postUserLocation}
        friendPicture={postUserPicture}
      />

      <Typography
        // color={main}
        sx={{ mt: "1rem" }}
        onClick={() => navigate(`/post/${postId}`)}
      >
        {title}
      </Typography>
      {photo && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:8080/images/${photo}`}
          onClick={() => navigate(`/post/${postId}`)}
        />
      )}
      <Typography color={main} variant="h6">
        Posted at {postedTime(createdAt)}
      </Typography>
      <FlexBox mt="0.25rem">
        <FlexBox gap="1rem">
          <FlexBox gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBox>
          <FlexBox gap="0.3rem">
            <IconButton onClick={() => setIsComment(!isComment)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{comments.length}</Typography>
          </FlexBox>
        </FlexBox>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBox>
      <Divider />
      {isComment && (
        <Box mt="0.5rem">
          {comments.map((comment, i) => (
            <>
              <Box
                key={`${title}-${i}`}
                bgcolor={palette.neutral.light}
                borderRadius="1rem"
              >
                <Typography
                  sx={{ color: main, m: "0.5rem", pl: "1rem" }}
                  fontWeight={700}
                >
                  {comment.userId.firstName} {comment.userId.lastName}
                </Typography>
                <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
                  {comment.comment}
                </Typography>
              </Box>
              <FlexBox marginLeft="1rem">
                <FlexBox gap="1rem">
                  <Typography>like</Typography>
                  <Typography>reply</Typography>
                  <Typography>{commentTime(comment.createdAt)}</Typography>
                </FlexBox>
              </FlexBox>
            </>
          ))}

          <FlexBox>
            <form
              onSubmit={addComment}
              style={{ position: "relative", width: "100%" }}
            >
              <InputBase
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                sx={{
                  backgroundColor: palette.neutral.light,
                  width: "100%",
                  padding: "1rem 2rem",
                  borderRadius: "2rem",
                }}
              />
              <IconButton
                type="submit"
                sx={{ position: "absolute", right: 0, top: 0, bottom: 0 }}
              >
                <SendRoundedIcon />
              </IconButton>
            </form>
          </FlexBox>
        </Box>
      )}
    </WidgetBox>
  );
};

export default PostWidget;
