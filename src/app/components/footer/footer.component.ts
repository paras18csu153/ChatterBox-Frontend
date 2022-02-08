import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  send(){
    console.log("Hi");
  }
}
