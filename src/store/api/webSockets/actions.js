import TokenStorage from '../token';
import { history } from '../../index';
import { wsSend } from './webSocket';

export const handleCheckCurrentUser = () => {
  const token = TokenStorage.getItemFromLocalStorage();
  if (!token) {
    history.push('/');
  } else {
    wsSend({
      type: 'user_join_chat',
    })
  }
};

export const handleAuthentication = (login, password) => {
  wsSend({
    type: 'user_join_chat',
    data: {
      login, password
    }
  });
};

export const handleCreatingRoom = roomName => {
  wsSend({
    type: 'create_room',
    data: {
      roomName
    }
  })
};

export const handleJoiningRoom = roomId => {
  wsSend({
    type: 'user_joined_room',
    data: {
      roomId
    }
  });
};

export const handleLeavingRoom = () => {
  wsSend({
    type: 'user_left_room'
  });
};

export const handleSendingMessage = messageBody => {
  wsSend({
    type: 'new_message',
    data: {
      messageBody
    }
  });
};

export const handleEditingMessage = (messageBody, messageId) => {
  wsSend({
    type: 'edit_message',
    data: {
      messageBody,
      messageId
    }
  });
};

export const handleDeletingMessage = messageId => {
  wsSend({
    type: 'delete_message',
    data: {
      messageId
    }
  })
};

export const handleDeletingRoom = (roomId, userId) => {
  wsSend({
    type: 'delete_room',
    data: {
      roomId,
      userId
    }
  })
};

export const handleLeavingChat = () => {
  wsSend({
    type: 'user_left_chat'
  })
};
