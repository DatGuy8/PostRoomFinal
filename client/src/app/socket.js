import { socketConnect, socketDisconnect, socketMessage } from './socketTest';
import io from 'socket.io-client';

const socket = io("http://localhost:8080");

const socketMiddleware = () => (dispatch) => {
  socket.on('connect', () => {
    dispatch(socketConnect());
  });

  socket.on('disconnect', () => {
    dispatch(socketDisconnect());
  });

  socket.on('message', (message) => {
    dispatch(socketMessage(message));
  });
};

export default socketMiddleware;