import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = "http://localhost:3000/api/users"

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAll(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.user?.token}`
    })

    return this.http.get(this.url, {headers});
  }



  
}