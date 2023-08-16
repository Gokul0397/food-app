import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/Interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/Interfaces/IUserRegister';



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
  public get currentUser():User{
    return this.userSubject.value;
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
  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next:(user)=>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user)
          this.toastrService.success(
            `Welcome to the Foodmine ${user.name}`,
            `Register Successfull`
          )
        },
        error:(errorResponse) => {
          this.toastrService.error(errorResponse.error,'Register Failed')
        }
      })
    )
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
