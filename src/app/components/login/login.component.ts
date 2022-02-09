import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocketIOService } from 'src/app/services/socket-io.service';

import { User } from '../../models/user.model';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  user = new User('', '', '', '', '');

  constructor(private socketService: SocketIOService, private userService: UserService, public toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.socketService.receiveMessage();
    if(document.cookie){
      this.router.navigate(['/dashboard']);
    }
  }

  submit(){
    this.user.email = this.user.username;

    this.userService.login(this.user).subscribe(
      (data: any) => {
        this.toastService.show('Logged in Successfully !!', { classname: 'bg-success text-light'});

        let d = new Date();
        d.setTime(d.getTime() + (60*60*1000));
        let username = "username=" + data.body.username;
        let token = "token=" + data.headers.get('Authorization');

        let expires = "expires=" + d.toUTCString();

        let tempCookie =  token + ";" + expires;
        document.cookie = tempCookie;

        tempCookie =  username + ";" + expires;
        document.cookie = tempCookie;

        this.socketService.setSocketData(data.body.username);

        this.router.navigate(['/dashboard']);
      },

      (error:any) => {
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
}
