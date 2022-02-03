import { Component } from '@angular/core';

import { User } from './models/user.model';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatterbox';

  user = new User('', '', '');
  loginError = false;
  errorMessage = '';

  constructor(private userService: UserService) { }

  submit(){
    this.user.email = this.user.username;
    console.log(this.user);
    this.userService.login(this.user).subscribe(
      (data) => {
        console.log('User Logged In!!', data);
      },
      (error) => {
        console.error('Error', error);
        this.loginError = true;
        this.errorMessage = error.statusText;
      }
    );
  }
}
