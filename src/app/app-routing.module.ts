import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksDisplayComponent } from './books-display/books-display.component';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';

const routes: Routes = [
  {path:'cart-items',component:CartItemsComponent},
  {path:'catalog-items',component:BooksDisplayComponent},
  {path:'login-page',component:LoginpageComponent},
  {path:'register-page',component:RegisterpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
