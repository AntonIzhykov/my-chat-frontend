import React from 'react';
import _ from 'lodash';
import { handleCreatingRoom } from '../../store/api/webSockets/actions';

const RoomCreator = ({ onClose }) => {
  const handleSubmit = e => {
    e.preventDefault();
    !_.isEmpty(inputRoomName.current.value.trim()) &&
      handleCreatingRoom(inputRoomName.current.value);
    inputRoomName.current.value = '';
    onClose && onClose();
  };

  const inputRoomName = React.createRef();

  return (
    <form onSubmit={handleSubmit} className="room-creator ml-2">
      <input type="text" ref={inputRoomName} />
      <button type="submit" className="btn cursor-pointer text-uppercase ml-1">
        add room
      </button>
    </form>
  );
};

export default RoomCreator;
