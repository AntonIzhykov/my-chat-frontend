import * as con from './constants';

export const setCurrentRoom = currentRoom => ({
  type: con.SET_CURRENT_ROOM,
  payload: currentRoom
});

export const setLastRoom = lastRoom => ({
  type: con.SET_LAST_ROOM,
  payload: lastRoom
});

export const addNewRoom = newRoom => ({
  type: con.ADD_NEW_ROOM,
  payload: newRoom
});

export const pushNewMessage = message => ({
  type: con.PUSH_NEW_MESSAGE,
  payload: message
});

export const userJoinedRoom = data => ({
  type: con.USER_JOINED_ROOM,
  payload: data
});

export const userLeftRoom = user => ({
  type: con.USER_LEFT_ROOM,
  payload: user
});

export const roomEdited = room => ({
  type: con.ROOM_EDITED,
  payload: room
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

export const userHasBeenChanged = user => ({
  type: con.USER_HAS_BEEN_CHANGED,
  payload: user
});

export const getRoomsRequest = () => ({
  type: con.GET_ROOMS_REQUEST
});

export const getRoomsSuccess = rooms => ({
  type: con.GET_ROOMS_SUCCESS,
  payload: rooms
});

export const getRoomsFailure = error => ({
  type: con.GET_ROOMS_FAILURE,
  payload: error
});

export const updateProfileRequest = () => ({
  type: con.UPDATE_PROFILE_REQUEST
});

export const updateProfileRSuccess = newUser => ({
  type: con.UPDATE_PROFILE_SUCCESS,
  payload: newUser
});

export const updateProfileRFailure = error => ({
  type: con.UPDATE_PROFILE_FAILURE,
  payload: error
});

export const saveNewAvatar = image => ({
  type: con.SAVE_NEW_AVATAR,
  payload: image
});

export const loadTempImageRequest = () => ({
  type: con.LOAD_TEMP_IMAGE_REQUEST
});

export const loadTempImageSuccess = () => ({
  type: con.LOAD_TEMP_IMAGE_SUCCESS
});

export const loadTempImageFailure = error => ({
  type: con.LOAD_TEMP_IMAGE_FAILURE,
  payload: error
});
