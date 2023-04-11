import {
  EditOutlined,
  DeleteOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBox from "components/FlexBox";
import Dropzone from "react-dropzone";
import UserProfilePhoto from "components/UserProfilePhoto";
import WidgetBox from "components/WidgetBox";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const AddPostWidget = ({ userPhoto }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const { _id } = useSelector((state) => state.user);

  const isNonMobileScreens = useMediaQuery("(min-width:1000px");
  const { palette } = useTheme();
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    if(image){
      formData.append('photo', image);
    }
    formData.append('title', title);
    formData.append('userId', _id);
    axios
      .post(`http://localhost:8080/api/posts/create`, formData)
      .then((res) => {
        console.log(res);
        setImage(null);
        setTitle('')
      })
      .catch((err) => {
        console.log(err);
      });
      
  };

  

  return (
    <WidgetBox>
      <FlexBox gap='1.5rem'>
        <UserProfilePhoto userPhoto={userPhoto} />

        <InputBase
          placeholder="What do you want to post?"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          sx={{
            backgroundColor: palette.neutral.light,
            width: "100%",
            padding: "1rem 2rem",
            borderRadius: "2rem",
          }}
        />
      </FlexBox>
      {/* ========IMAGE DROPZONE OPENS WHEN USER CLICKS ADD IMAGE========== */}
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
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
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
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBox>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBox>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBox>
            )}
          </Dropzone>
        </Box>
      )}
      {/* =============IMAGE DROPZONE OPENS WHEN USER CLICKS ADD IMAGE============== */}

      <Divider sx={{ margin: "1.25rem 0" }} />

      {/* =========================== ADD TO POST ICONS ========================== */}
      <FlexBox>
        <FlexBox gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBox>
        
        <Button
          disabled={!title}
          onClick={handlePost}
          sx={{
            color: "palette.background.alt",
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          Post
        </Button>
      </FlexBox>
    </WidgetBox>
  );
};

export default AddPostWidget;
