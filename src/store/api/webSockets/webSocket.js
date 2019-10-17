import * as actions from '../../chat/actions';
import * as authActions from '../../auth/actions';
import { store } from '../../index';
import { history } from '../../index';
import TokenStorage from '../token';
import Swal from 'sweetalert2';
import { defaultWs } from '../config';

export let ws;
export const connect = () => {
  ws = new WebSocket(defaultWs);
  ws.binaryType = 'arraybuffer';

  ws.onopen = () => {
    console.log('ONLINE');
    store.dispatch(authActions.setOnline());
  };

  ws.onclose = () => {
    console.log('DISCONNECTED');
    store.dispatch(authActions.setOffline());
    // ws.binaryType = "arraybuffer";
    connect();
  };

  ws.onmessage = response => {
    const serverMessage = JSON.parse(response.data);
    console.log('new message from wss => ', serverMessage);

    if (serverMessage.currentRoom) {
      store.dispatch(actions.setCurrentRoom(serverMessage.currentRoom));
    }
    if (serverMessage.messageBody) {
      store.dispatch(actions.pushNewMessage(serverMessage));
    }
    if (serverMessage.messageEdited) {
      store.dispatch(actions.messageEdited(serverMessage.messageEdited));
    }
    if (serverMessage.messageDeleted) {
      store.dispatch(actions.messageDeleted(serverMessage.messageDeleted));
    }
    if (serverMessage.userJoinedRoom) {
      !store
        .getState()
        .chat.currentRoom.users.filter(user => user._id === serverMessage.userJoinedRoom._id)
        .length && store.dispatch(actions.userJoinedRoom(serverMessage.userJoinedRoom));
    }
    if (serverMessage.userLeftRoom) {
      store.dispatch(actions.userLeftRoom(serverMessage.userLeftRoom));
    }
    if (serverMessage.newRoom) {
      store.dispatch(actions.addNewRoom(serverMessage.newRoom));
    }
    if (serverMessage.roomDeleted) {
      store.dispatch(actions.roomDeleted(serverMessage.roomDeleted));
      if (store.getState().chat.currentUser.currentRoom === serverMessage.roomDeleted) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'This room has been deleted!'
        });
        history.push('/chat');
      }
    }
    if (serverMessage.userLeftChat) {
      store.dispatch(authActions.userLeftChat());
      history.push('/');
    }
    if (serverMessage.userHasBeenChanged) {
      store.dispatch(actions.userHasBeenChanged(serverMessage.userHasBeenChanged));
      store.dispatch(authActions.setLoadingFalse());
    }
    if (serverMessage.error) {
      store.dispatch(authActions.setLoadingFalse());
      Swal.fire({
        type: 'error',
        title: 'Oops... Something went wrong...',
        text: serverMessage.error.message
      });
    }
  };

  ws.onerror = error => {
    console.log(error);
    if (ws && ws.readyState) {
      Swal.fire({
        type: 'error',
        title: 'Oops... Something went wrong...',
        text: error.message
      });
    }
  };
};

// connect();

export const wsSend = data => {
  const token = TokenStorage.getItemFromLocalStorage();
  const newData = token ? { ...data, token } : data;
  if (!ws.readyState) {
    setTimeout(function() {
      wsSend(data);
    }, 100);
  } else {
    ws.send(JSON.stringify(newData));
  }
};
