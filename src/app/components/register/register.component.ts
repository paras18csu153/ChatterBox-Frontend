import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new User('', '', '', '', '');

  constructor(private userService: UserService, public toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
    if(document.cookie){
      this.router.navigate(['/']);
    }
  }

  submit(){
    this.user.email = this.user.username;

    this.userService.login(this.user).subscribe(
      (data) => {
        this.toastService.show('Logged in Successfully !!', { classname: 'bg-success text-light'});

        let d = new Date();
        d.setTime(d.getTime() + (60*60*1000));
        let token = "token=" + data.headers.get('Authorization');

        let expires = "expires=" + d.toUTCString();

        let tempCookie = token + ";" + expires;

        document.cookie = tempCookie;

        this.router.navigate(['/login']);
      },

      (error) => {
        this.toastService.show(error.statusText, { classname: 'bg-danger text-light'});
      }
    );
  }

}
