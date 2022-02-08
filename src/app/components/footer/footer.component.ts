import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  message:any;

  constructor() { }

  ngOnInit(): void {
  }

  send(){
    console.log(this.message);
    socket.emit('chat message', this.message);
    socket.on('new_msg', (msg)=>{
      console.log(msg);
    });
    this.message = "";
  }
}
