import * as actions from '../../chat/actions';
import { handleCheckCurrentUser } from './actions';
import { store } from '../../index';
import { history } from '../../index';
import TokenStorage from '../token';
import Swal from 'sweetalert2';

let ws = new WebSocket(`ws://localhost:5000`);
const connect = () => {

  ws.onopen = () => {
    handleCheckCurrentUser();
    console.log('ONLINE');
    store.dispatch(actions.setOnline());
  };

  ws.onclose = () => {
    console.log('DISCONNECTED');
    store.dispatch(actions.setOffline());
    ws = new WebSocket(`ws://localhost:5000`);
    connect();
  };

  ws.onmessage = response => {
    const serverMessage = JSON.parse(response.data);
    console.log("new message from wss => ", serverMessage);

    if(serverMessage.token) {
      TokenStorage.setItemInLocalStorage(serverMessage.token);
      store.dispatch(actions.setCurrentUser(serverMessage.user));
      store.dispatch(actions.setChatRooms(serverMessage.chatRooms))
    }
    if(serverMessage.currentRoom) {
      store.dispatch(actions.setCurrentRoom(serverMessage.currentRoom))
    }
    if(serverMessage.messageBody) {
      store.dispatch(actions.pushNewMessage(serverMessage));
    }
    if(serverMessage.messageEdited) {
      store.dispatch(actions.messageEdited(serverMessage.messageEdited))
    }
    if(serverMessage.messageDeleted) {
      store.dispatch(actions.messageDeleted(serverMessage.messageDeleted))
    }
    if(serverMessage.userJoinedRoom) {
      !store.getState().chat.currentRoom.users.filter(user => user._id === serverMessage.userJoinedRoom._id).length &&
      store.dispatch(actions.userJoinedRoom(serverMessage.userJoinedRoom))
    }
    if(serverMessage.userLeftRoom) {
      store.dispatch(actions.userLeftRoom(serverMessage.userLeftRoom))
    }
    if(serverMessage.newRoom) {
      store.dispatch(actions.addNewRoom(serverMessage.newRoom))
    }
    if(serverMessage.roomDeleted) {
      store.dispatch(actions.roomDeleted(serverMessage.roomDeleted));
      if (store.getState().chat.currentUser.currentRoom === serverMessage.roomDeleted) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'This room has been deleted!',
        });
        history.push('/chat');
      }
    }
    if(serverMessage.userLeftChat) {
      store.dispatch(actions.userLeftChat());
      history.push('/');
    }
    if(serverMessage.error) {
      Swal.fire({
        type: 'error',
        title: 'Oops... Something went wrong...',
        text: serverMessage.error.message,
      });
    }
  };

  ws.onerror = error =>{
    console.log(error);
    Swal.fire({
      type: 'error',
      title: 'Oops... Something went wrong...',
      text: error.message,
    });
  };
};

connect();

export const wsSend = data => {
  const token = TokenStorage.getItemFromLocalStorage();
  const newData = token ? { ...data, token } : data;
  if(!ws.readyState){
    setTimeout(function (){
      wsSend(data);
    },100);
  }else{
    ws.send(JSON.stringify(newData));
  }
};
