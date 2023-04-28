import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';



const USER_KEY='User'
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage()); //behavioursubject is used to read and write mode inside it
  public userObservable:Observable<any>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }
  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL,userLogin).pipe(
      tap({
        next: (User) => {
          this.setUserToLocalStorage(User);
          this.userSubject.next(User)
          this.toastrService.success(
            `Welcome To FoodMine!`,
            `Login Successfull ${User.name}`
          )
        },
        error:  (errorResponse) =>{
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );

  }
  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }
  private setUserToLocalStorage(user:User) {
    localStorage.setItem(USER_KEY,JSON.stringify(user))
  }
  private getUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User; //there is a value in localstorage it will convert that into object
    return new User();
  }
}
