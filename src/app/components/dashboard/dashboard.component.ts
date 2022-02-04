import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private chatService: ChatService, public toastService: ToastService) { }

  ngOnInit(): void {
    let username = this.getCookie("username");
    let token = this.getCookie("token");

    this.chatService.get(username, token).subscribe(
      (data: any) => {
        console.log(data);
      },

      (error :any) => {
        this.toastService.show(error.error.message, { classname: 'bg-danger text-light'});
      }
    );
  }

  getCookie(cname: String) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  set(string: String){
    if(string == "image"){
      return "image";
    }
    return "text"
  }
}
