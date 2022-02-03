import { Component } from '@angular/core';

import { User } from './models/user.model';
import { ToastService } from './services/toast.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatterbox';

  user = new User('', '', '');

  constructor(private userService: UserService, public toastService: ToastService) { }

  submit(){
    this.user.email = this.user.username;
    console.log(this.user);
    this.userService.login(this.user).subscribe(
      (data) => {
        this.toastService.show('Logged in Successfully !!', { classname: 'bg-success text-light'});
        console.log('User Logged In!!', data);
      },
      (error) => {
        this.toastService.show(error.statusText, { classname: 'bg-danger text-light'});
        console.error('Error', error);
      }
    );
  }
}
