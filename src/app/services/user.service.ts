import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { ApiPaths } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  login(user: User){
    return this._http.post(`${this.url}${ApiPaths.Users}`, user, {observe: 'response'});
  }
}
