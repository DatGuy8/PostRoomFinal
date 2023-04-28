import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http';

import connectDB from './config/connectDB.js';
import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';
import commentRouter from './routes/comment.routes.js';

dotenv.config();
const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use('/api/users',userRouter);
app.use('/api/posts',postRouter);
app.use('/api/comments',commentRouter);
app.use('/images', express.static('images'));

const server = http.createServer(app);
const io = new Server(server, {cors: true});

let onlineUsers = [];

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

io.on("connection", (socket) =>{
  console.log('Client Connected!', socket.id);
  console.log('========================================')
  // socket.on("recievedNewPost",(msg)=>{
  //   console.log(msg);
  //   io.emit('newPost',msg);
  // })
  socket.on("newUser", (userName)=>{
    addNewUser(userName, socket.id);
    console.log(onlineUsers);
  })

  socket.on("notification", ({sender, user, type})=>{
    const reciever = getUser(receiverName);
    io.to(reciever.socketId).emit("getNotification",{
      sender,
      text
    })
  })

  // socket.on("",())

  socket.on("disconnect", () => {
    removeUser(socket.id);
    console.log('disconnected user', onlineUsers);
  });
})

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    server.listen(8080, () => console.log('Server started on port http://localhost:8080'));
  } catch (error) {
    console.log(error);
  }
}

startServer();