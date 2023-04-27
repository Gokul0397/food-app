import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent {

  cartQuantity=0;
  constructor(cartService:CartService,userService:UserService){
    cartService.getCartObservable().subscribe((newCart)=>{
      this.cartQuantity=newCart.totalCount;
    })
    userService.userObservable().subscribe(newUser)
  }

}
