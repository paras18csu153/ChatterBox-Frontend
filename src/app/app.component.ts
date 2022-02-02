import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chatterbox';

  submit(form:any){
    console.log(form);
    console.log(form.name);
  }
}
