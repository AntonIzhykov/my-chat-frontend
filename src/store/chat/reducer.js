import * as con from './constants';
import { USER_LEFT_CHAT, GET_USER_SUCCESS } from '../auth/constants';
import _ from 'lodash';

export const initialState = {
  chatRooms: [],
  currentRoom: {},
  currentUser: {},
  newAvatar: {},
  error: '',
  loading: false
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS:
      return {
        ...state,
        currentUser: action.payload
      };

    case con.GET_ROOMS_SUCCESS:
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
      let authors = [];
      action.payload.messages.forEach(message => authors.push(message.author));
      authors = _.uniqBy(authors, '_id');
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          currentRoom: action.payload._id
        },
        currentRoom: {
          ...action.payload,
          authors
        }
      };

    case con.SET_LAST_ROOM:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          lastRoom: action.payload
        }
      };

    case con.ADD_NEW_ROOM:
      return {
        ...state,
        error: '',
        chatRooms: [...state.chatRooms, action.payload]
      };

    case con.PUSH_NEW_MESSAGE:
      let messagesAuthors = state.currentRoom.authors;
      !messagesAuthors.includes(action.payload.author) &&
        messagesAuthors.push(action.payload.author);
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          messages: [...state.currentRoom.messages, action.payload],
          authors: messagesAuthors
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
          messages: state.currentRoom.messages.map(message =>
            message._id === action.payload._id ? action.payload : message
          )
        }
      };

    case con.USER_JOINED_ROOM:
      return {
        ...state,
        currentRoom: {
          ...state.currentRoom,
          users: state.currentRoom.users.includes(action.payload)
            ? state.currentRoom.users
            : [...state.currentRoom.users, action.payload]
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

    case USER_LEFT_CHAT:
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

    case con.USER_HAS_BEEN_CHANGED:
      let newAuthors = [];
      if (state.currentRoom && state.currentRoom.authors && state.currentRoom.authors.length) {
        newAuthors = state.currentRoom.authors.map(author =>
          author._id === action.payload._id ? action.payload : author
        );
      }
      return {
        ...state,
        currentUser:
          state.currentUser._id === action.payload._id ? action.payload : state.currentUser,
        currentRoom: {
          ...state.currentRoom,
          authors: newAuthors
        }
      };

    case con.UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case con.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload
      };

    case con.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case con.SAVE_NEW_AVATAR:
      return {
        ...state,
        newAvatar: action.payload
      };

    case con.LOAD_TEMP_IMAGE_REQUEST:
      return {
        ...state,
        loading: true
      };

    case con.LOAD_TEMP_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false
      };

    case con.LOAD_TEMP_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
