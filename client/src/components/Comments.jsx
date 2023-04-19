import { useState } from "react";
import {
  useTheme,
  Box,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import FlexBox from "./FlexBox";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const Comments = ({ postId, comments }) => {
  const [comment, setComment] = useState("");

  const addComment = () =>{}

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

  return (
    <Box mt="0.5rem">
      {comments.map((comment, i) => (
        <Box key={`${comment.createdAt}-${i}`}>
          
          <Typography sx={{ color: main, m: "0.5rem", pl: "1rem" }}>
            {comment.comment}
          </Typography>
        </Box>
      ))}
      
      <FlexBox position="relative">
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
          sx={{ position: "absolute", right: 0 }}
          onClick={addComment}
        >
          <SendRoundedIcon />
        </IconButton>
      </FlexBox>
    </Box>
  );
};

export default Comments;
