import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.css']
})
export class CartItemsComponent implements OnInit {
  cart:any=[]
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.getCartItems().subscribe(data=>this.cart=data.cart)
  }

}
