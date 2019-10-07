import * as con from './constants';

export const setOnline = () => ({
  type: con.SET_ONLINE
});

export const setOffline = () => ({
  type: con.SET_OFFLINE
});

export const setChatRooms = rooms => ({
  type: con.SET_CHAT_ROOMS,
  payload: rooms
});

export const setCurrentRoom = currentRoom => ({
  type: con.SET_CURRENT_ROOM,
  payload: currentRoom
});

export const setCurrentUser = user => ({
  type: con.SET_CURRENT_USER,
  payload: user
});

export const addNewRoom = newRoom => ({
  type: con.ADD_NEW_ROOM,
  payload:newRoom
});

export const pushNewMessage = message => ({
  type: con.PUSH_NEW_MESSAGE,
  payload: message
});

export const userJoinedRoom = user => ({
  type: con.USER_JOINED_ROOM,
  payload: user
});

export const userLeftRoom = user => ({
  type: con.USER_LEFT_ROOM,
  payload: user
});

export const roomDeleted = roomId => ({
  type: con.ROOM_DELETED,
  payload: roomId
});

export const messageDeleted = messageId => ({
  type: con.MESSAGE_DELETED,
  payload: messageId
});

export const messageEdited = message => ({
  type: con.MESSAGE_EDITED,
  payload: message
});

export const userLeftChat = () => ({
  type: con.USER_LEFT_CHAT
});
