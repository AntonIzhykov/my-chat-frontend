import React, { useState } from 'react';
import { handleDeletingRoom, handleChangingRoomName } from '../../store/api/webSockets/actions';

const RoomSettings = ({ room: { roomName, _id }, userId, closeModal }) => {
  const [newRoomName, setRoomName] = useState(roomName);
  const handleChange = e => {
    setRoomName(e.target.value);
  };
  const handleDelete = () => {
    handleDeletingRoom(_id, userId);
    closeModal && closeModal();
  };
  return (
    <div className="room-settings">
      <div className="change-name">
        <input
          type="text"
          value={newRoomName}
          onChange={handleChange}
          placeholder="Enter new room name"
        />
        <button className="btn" onClick={() => handleChangingRoomName(_id, newRoomName)}>
          Change room name
        </button>
      </div>
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete this room
      </button>
    </div>
  );
};

export default RoomSettings;
