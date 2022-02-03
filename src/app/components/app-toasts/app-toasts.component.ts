import { Component, OnInit } from '@angular/core';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-app-toasts',
  templateUrl: './app-toasts.component.html',
  styleUrls: ['./app-toasts.component.css']
})
export class AppToastsComponent implements OnInit {

  constructor(public toastService: ToastService) { }

  ngOnInit(): void {
  }

}
