import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() display:String = "";
  
  constructor(private userService: UserService, public toastService: ToastService,private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    let data = new User('', this.getCookie("username"), '', '', '');
    let token = this.getCookie("token");
    console.log(data.username);
    console.log(document.cookie);

    this.userService.logout(data, token).subscribe(
      (data) => {
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
      },

      (error) => {
        console.log("Hi");
        this.toastService.show(error.statusText, { classname: 'bg-danger text-light'});
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
}
