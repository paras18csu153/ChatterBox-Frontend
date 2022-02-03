import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatterbox';

  user = {username: '', email: '', password: ''};

  submit(form:any){
    console.log(form);
    console.log(this.user);
    console.log(!this.user.email);
  }
}
