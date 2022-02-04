import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiPaths, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  url = environment.baseUrl;

  constructor(private _http: HttpClient) { }

  get(username: string, token: string){
    let headers = new HttpHeaders;
    headers = headers.append("Authorization", token);
    return this._http.get(`${this.url}${ApiPaths.Chats}${username}`, {headers});
  }
}
