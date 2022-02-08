import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

@Injectable({
  providedIn: 'root'
})
export class SocketIOService {

  constructor() { }

  sendMessage(message: any){
    socket.emit('sendMessage', { message });
  }

  receiveMessage(){
    socket.on('receiveMessage', (msg)=>{
      console.log(msg);
    });
  }
}
