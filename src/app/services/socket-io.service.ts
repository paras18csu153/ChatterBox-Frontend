import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  constructor() { }

  sendMessage(data: any){
    socket.emit('sendMessage', data);
  }

  receiveMessage(){
    socket.on('receiveMessage', (msg)=>{
      console.log(msg);
      console.log("Received Message");
    });
  }

  setSocketData(data:any){
    let socketData = {
      username: data
    }
    socket.emit('setSocketData', socketData);
  }
}
