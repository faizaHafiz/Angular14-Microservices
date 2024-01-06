import { Component, OnInit } from '@angular/core';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loggedIn=false
  constructor(private loginRegisterService:LoginRegisterService) { }

  ngOnInit(): void {
    this.loginRegisterService.login(null).subscribe(data=>{this.loggedIn=data.loggedIn})
  }



}
