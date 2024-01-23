import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isConnected() : boolean {
    return localStorage.getItem("token") != undefined
  }


  sujetAObserver : Subject<boolean> = new Subject<boolean>()

  private url :string = "https://localhost:7152/api/"
  constructor(
    private client : HttpClient
  ) { }

  sendIsConnectedValue() {
    this.sujetAObserver.next(this.isConnected)
  }

  login(email : string, password : string) {
    this.client.post(this.url+"user/login", {email, password}, {responseType : "text"}).subscribe({
      next : (token : string) => {
        console.log(token)
        localStorage.setItem("token", token)
        this.sujetAObserver.next(this.isConnected)
      },
      error : (error) => console.log(error),
      complete : () => console.log("c'est fini")

    })
  }

  logout() {
    localStorage.removeItem("token")
    this.sujetAObserver.next(this.isConnected)

  }

  getAllUser() : Observable<User[]> {
    //let myHeader : HttpHeaders = new HttpHeaders({"authorization" : "bearer "+localStorage.getItem("token")})
    return this.client.get<User[]>(this.url + "user"/*, {headers : myHeader}*/)
  }
}
