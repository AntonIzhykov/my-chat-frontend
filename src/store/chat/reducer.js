import * as con from './constants';

export const initialState = {
  chatRooms: [],
  currentRoom: {},
  currentUser: {},
  error: "",
  isOnline: false
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case con.SET_ONLINE:
      return {
        ...state,
        isOnline: true,
      };
    case con.SET_OFFLINE:
      return {
        ...state,
        isOnline: false,
      };

    case con.SET_CHAT_ROOMS:
      return {
        ...state,
        chatRooms: action.payload
      };

    case con.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      };

    case con.SET_CURRENT_ROOM:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          currentRoom: action.payload._id
        },
        currentRoom: action.payload
      };

    case con.ADD_NEW_ROOM:
      return {
        ...state,
        error: '',
        chatRooms: [
          ...state.chatRooms,
          action.payload
        ]
      };

    case con.PUSH_NEW_MESSAGE:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: [
            ...state.currentRoom.messages,
            action.payload
          ]
        }
      };

    case con.MESSAGE_DELETED:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: state.currentRoom.messages.filter(message => message._id !== action.payload)
        }
      };

    case con.MESSAGE_EDITED:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: state.currentRoom.messages.map(message => message._id === action.payload._id ? action.payload : message)
        }
      };

    case con.USER_JOINED_ROOM:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          users: state.currentRoom.users.includes(action.payload) ? state.currentRoom.users : [...state.currentRoom.users, action.payload]
        }
      };

    case con.USER_LEFT_ROOM:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          users: state.currentRoom.users.filter(user => user._id !== action.payload)
        },
        currentUser: {
          ...state.currentUser,
          currentRoom: state.currentUser._id === action.payload ? '' : state.currentUser.currentRoom
        }
      };

    case con.USER_LEFT_CHAT:
      return {
        ...state,
        currentUser: {},
        currentRoom: {},
        chatRooms: []
      };

    case con.ROOM_DELETED:
      return {
        ...state,
        chatRooms: state.chatRooms.filter(room => room._id !== action.payload)
      };

    default:
      return state;
  }
};
