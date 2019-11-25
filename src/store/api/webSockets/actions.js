import { wsSend } from './webSocket';

export const handleCreatingRoom = roomName => {
  wsSend({
    type: 'create_room',
    data: {
      roomName
    }
  });
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
  });
};

export const handleChangingRoomName = (roomId, newRoomName) => {
  wsSend({
    type: 'edit_room',
    data: {
      roomId,
      newRoomName
    }
  });
};

export const handleDeletingRoom = (roomId, userId) => {
  wsSend({
    type: 'delete_room',
    data: {
      roomId,
      userId
    }
  });
};

export const handleLeavingChat = () => {
  wsSend({
    type: 'user_left_chat'
  });
};
