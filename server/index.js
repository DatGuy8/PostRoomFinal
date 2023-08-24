import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import connectDB from './config/connectDB.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';
import notificationRouter from './routes/notification.routes.js';

dotenv.config();
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {cors: true});

app.use(express.json({ limit: '50mb' }));
app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);
app.use('/api/comments',commentRouter);
app.use('/api/notifications', notificationRouter);
app.use('/images', express.static('images'));


// Sets up users to have live notifications
let onlineUsers = [];


const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    server.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
}


startServer();

// these are functions that use for socket io
const addNewUser = (userName, socketId) => {
  !onlineUsers.some((user) => user.userName === userName) &&
    onlineUsers.push({ userName, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userName) => {
  return onlineUsers.find((user) => user.userName === userName);
};

// when a user signs in
io.on("connection", (socket) =>{
  console.log('Client Connected!', socket.id);

  //adds username of logged in user to the list of other online users
  socket.on("newUser", (userName)=>{
    addNewUser(userName, socket.id);
    console.log(onlineUsers);
  });

  // Listens for notifications
  socket.on("newNotification", (targetUserName)=>{
    
    const targetUser = getUser(targetUserName);
    console.log("targetUser", targetUser);
    if(targetUser){
      io.to(targetUser.socketId).emit("recieveNotification", "notification");
    };
  });


  // when a users logs out or exits they are removed from live notifications
  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log('disconnected user', onlineUsers);
  });
});