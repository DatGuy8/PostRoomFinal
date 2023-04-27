// action types
export const SOCKET_CONNECT = 'SOCKET_CONNECT';
export const SOCKET_DISCONNECT = 'SOCKET_DISCONNECT';
export const SOCKET_MESSAGE = 'SOCKET_MESSAGE';

// action creators
export const socketConnect = () => ({
  type: SOCKET_CONNECT,
});

export const socketDisconnect = () => ({
  type: SOCKET_DISCONNECT,
});

export const socketMessage = (message) => ({
  type: SOCKET_MESSAGE,
  payload: message,
});

