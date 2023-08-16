import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {

  cartQuantity=0;
  user!:User
  constructor(cartService:CartService,private userService:UserService){
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity=newCart.totalCount;
    })
    userService.userObservable.subscribe((newUser)=>{
      this.user=newUser;
    })
  }
  logout(){
    this.userService.logout()
  }
  get isAuth(){
    console.log(this.user.token)
    return this.user.token;
  }
}
