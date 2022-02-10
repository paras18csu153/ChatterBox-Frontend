import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SocketIOService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() display:String = "";
  @Output() newMessageEvent = new EventEmitter<string>();

  message:any;

  constructor(private socketService: SocketIOService) { }

  ngOnInit(): void {
  }

  send(){
    if(this.message != ""){
      let data = {
        message : this.message,
        to: this.display
      }
      this.socketService.sendMessage(data);
      this.addNewItem(this.message);
      this.message = "";
    }
  }

  addNewItem(value: string) {
    this.newMessageEvent.emit(value);
  }
}
