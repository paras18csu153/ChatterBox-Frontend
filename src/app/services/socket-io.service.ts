import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  constructor() { }

  setSocketData(data:any){
    let socketData = {
      username: data,
      socketId: socket.id
    }
    socket.emit('setSocketData', socketData);
  }

  sendMessage(data: any){
    socket.emit('sendMessage', data);
  }

  receiveMessage(){
    socket.on('receiveMessage', (msg)=>{
      console.log("Received Message: " + msg);
    });
  }

  removeAllListeners(){
    socket.removeAllListeners();
  }
}
