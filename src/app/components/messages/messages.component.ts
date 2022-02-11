import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnChanges {
  @Input() display:String = "";
  @Input() message:String = "";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void{
    console.log(this.message);
    var messages = document.getElementById("messages")!;
    console.log(messages);
    if(messages){
      messages.innerHTML = messages.innerHTML + "<div class='row my-rows' style= 'margin: 0'><div class='offset-md-7 col-md-5'><p style='background-color: rgb(250, 250, 250, 0.5);margin-top: 5%;margin-bottom: 5%;padding: 5% 2.5%;'>"+ this.message +"</p></div></div>";
    }
  }
}
