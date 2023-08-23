import FlexBox from "components/FlexBox";
import { ThemeProvider, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { CssBaseline } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "views/loginPage";
import HomePage from "views/homePage";
import ProfilePage from "views/profilePage";
import PostPage from "views/postPage";
import NavBar from "views/navBar";
import { io } from "socket.io-client";

function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const isAuth = Boolean(useSelector((state) => state.token));
    const [socket] = useState(io(":8080"));

    const user = useSelector((state) => state.user);
    const userName = user.userName;

    // SETTING UP SOCKET IO TO RECIEVE NOTIFICATIONS
    useEffect(() => {
        socket.emit("newUser", userName);

        socket.on("recieveNotification", (notification) => {
            console.log("in App.js socket responding", notification);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    // const emitNotification = (targetUserName, notification) => {
    //     socket.emit("newNotification", { targetUserName, notification });
    // };

    return (
        <div>
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    {isAuth ? <NavBar/> : null}
                    <Routes>
                        <Route
                            path="/"
                            element={
                                isAuth ? <Navigate to="/home" /> : <LoginPage />
                            }
                        />
                        <Route
                            path="/home"
                            element={
                                isAuth ? <HomePage /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/profile/:_id"
                            element={
                                isAuth ? <ProfilePage /> : <Navigate to="/" />
                            }
                        />
                        <Route
                            path="/post/:_id"
                            element={
                                isAuth ? <PostPage /> : <Navigate to="/" />
                            }
                        />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
