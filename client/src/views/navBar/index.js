import { useState, useEffect } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Badge,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { setMode, setLogout } from "state/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBox from "components/FlexBox";
import { io } from "socket.io-client";
import NotificationWidget from "widgets/NotificationWidget";


const NavBar = ({ notifications }) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [isNotificationWidget, setIsNotificationWidget] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userName = user.userName;
  const [notifications1, setNotifications1] = useState("");
  
  //============== COLORS ==================
  const { palette } = useTheme();
  const neutral = palette.neutral.light;
  const dark = palette.neutral.dark;
  const background = palette.background.default;
  const light = palette.primary.light;
  const alt = palette.background.alt;
  // const socket = io(":8080");

  // useEffect(()=>{
  //   socket.on("notifications", (notifications))
  // })

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io(":8080"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", user.userName);
    console.log("emit from client");
  }, [socket, user]);

  // // socket.on("getNotification", (data)=>{
  //   console.log('getNotification', data);
  //   setNotifications1(data);
  // })

  socket?.on("getNotification", (msg) => {
    console.log("ADFASDFASDF", msg);
    setNotifications1(msg);
  });

  const onLogOutHandler = () => {
    socket.disconnect();
    dispatch(setLogout());
  };

  return (
    <>
      <FlexBox
        padding="1rem 6%"
        backgroundColor={alt}
        position="fixed"
        top="0"
        width="100%"
        zIndex={10}
      >
        <FlexBox gap="2rem">
          <Typography
            fontWeight="bold"
            fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: light,
                cursor: "pointer",
              },
            }}
          >
            PostRoom
          </Typography>
          {isNonMobileScreens && (
            <FlexBox
              backgroundColor={neutral}
              borderRadius="9px"
              padding="0.1rem 1.5rem"
              gap="3rem"
            >
              <InputBase placeholder={notifications1} />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBox>
          )}
        </FlexBox>
        {/* NAV FOR DESKTOP AND BIG SCREENS */}
        {isNonMobileScreens ? (
          <FlexBox gap="2rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ fontSize: "25px", color: dark }} />
              )}
            </IconButton>

            <Message sx={{ fontSize: "25px" }} />

            <IconButton
              onClick={() => {
                setIsNotificationWidget(!isNotificationWidget);
              }}
            >
              <Badge badgeContent={notifications?.length} color="success">
                <Notifications sx={{ fontSize: "25px" }} />
              </Badge>
            </IconButton>
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={userName}>
              <Select
                value={userName}
                sx={{
                  backgroundColor: light,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: light,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={userName}>
                  <Typography>{userName}</Typography>
                </MenuItem>
                <MenuItem onClick={onLogOutHandler}>Logout</MenuItem>
              </Select>
            </FormControl>
          </FlexBox>
        ) : (
          // WHEN IT GETS TO SMALL SCREEN ADDS THE TOGGLE MENU BUTTON
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Badge badgeContent={user.notifications?.length} color="success">
              <Menu />
            </Badge>
          </IconButton>
        )}
        {/* NAV FOR SMALLER SCREENS */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position="fixed"
            right="0"
            bottom="0"
            height="100%"
            zIndex="10"
            maxWidth="500px"
            minWidth="300px"
            backgroundColor={background}
          >
            <Box display="flex" justifyContent="flex-end" p="1rem">
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>
            {/* MENU ITEMS */}
            <FlexBox
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              gap="3rem"
            >
              <IconButton
                sx={{ fontSize: "25px" }}
                onClick={() => dispatch(setMode())}
              >
                {palette.mode === "dark" ? (
                  <DarkMode sx={{ fontSize: "25px" }} />
                ) : (
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                )}
              </IconButton>

              <Message sx={{ fontSize: "25px" }} />

              <IconButton
                onClick={() => {
                  setIsNotificationWidget(!isNotificationWidget);
                }}
              >
                <Badge
                  badgeContent={user.notifications?.length}
                  color="success"
                >
                  <Notifications sx={{ fontSize: "25px" }} />
                </Badge>
              </IconButton>
              <Help sx={{ fontSize: "25px" }} />
              <FormControl variant="standard" value={userName}>
                <Select
                  value={userName}
                  sx={{
                    backgroundColor: light,
                    width: "150px",
                    borderRadius: "0.25rem",
                    padding: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: light,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={userName}>
                    <Typography>{userName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={onLogOutHandler}>Logout</MenuItem>
                </Select>
              </FormControl>
            </FlexBox>
          </Box>
        )}
      </FlexBox>
      {isNotificationWidget && <NotificationWidget />}
    </>
  );
};

export default NavBar;
