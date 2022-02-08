import { Component, OnInit, Input } from '@angular/core';
import { SocketIOService } from 'src/app/services/socket-io.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  @Input() display:String = "";

  message:any;

  constructor(private socketService: SocketIOService) { }

  ngOnInit(): void {
    this.socketService.receiveMessage();
  }

  send(){
    this.socketService.sendMessage(this.message);
    this.message = "";
  }
}
