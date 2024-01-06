import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {
  loginForm:FormGroup
  constructor(private loginRegisterService:LoginRegisterService, private router: Router) { 
    this.loginForm = new FormGroup({
      username: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required)
    })
  }
  users:string="";
  loggedIn = false;
  handleSubmit(){
    // console.log(this.loginForm.value)
    this.loginRegisterService.login(this.loginForm.value).subscribe(data=>{

      this.users=data.users,this.loggedIn=data.loggedIn
      alert("Logged in successfully"+ this.users)
    })
    this.router.navigate(['catalog-items'])
    
  }
  ngOnInit(): void {
  }

}
