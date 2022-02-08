import { Component, OnInit } from '@angular/core';
import { discardPeriodicTasks } from '@angular/core/testing';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chats:any;
  image:any = "image";
  display:any = "";

  constructor(private chatService: ChatService, public toastService: ToastService, private router: Router) {
    this.chats = [""];
  }

  ngOnInit(): void {
    let username = this.getCookie("username");
    let token = this.getCookie("token");

    this.chatService.get(username, token).subscribe(
      (data: any) => {
        console.log(data);
        this.chats = data.chattingWith;
        this.chats.reverse();
        console.log(this.chats);
      },

      (error :any) => {
        if(error.status == 403){
          this.toastService.show('Logged Out Successfully !!', { classname: 'bg-success text-light'});
        
          let d = new Date();
          d.setTime(d.getTime() - (60*60*1000));
          let username = "username=";
          let token = "token=";
        
          let expires = "expires=" + d.toUTCString();
        
          let tempCookie = token + ";" + expires;
          document.cookie = tempCookie;
        
          tempCookie = username + ";" + expires;
          document.cookie = tempCookie;
        
          this.router.navigate(['/login']);
        }
        else{
          this.toastService.show(error.error.message, { classname: 'bg-danger text-light'});
        }
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

  setDisplay(chat:string){
    console.log(chat);
    this.display = chat;
  }
}
