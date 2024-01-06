import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.css']
})
export class RegisterpageComponent implements OnInit {
  registerForm:FormGroup
  constructor(private loginRegisterService:LoginRegisterService,private router:Router) {
    this.registerForm = new FormGroup({
      fullname : new FormControl("",Validators.required),
      username: new FormControl("",Validators.required),
      password: new FormControl("",Validators.required),
      email: new FormControl("",Validators.required)
    })
   }

  ngOnInit(): void {
  }
  result:string=""

  handleSubmit(){
    // console.log(this.registerForm.value)
    this.loginRegisterService.register(this.registerForm.value).subscribe(data=>this.result=data.message)
    this.router.navigate(['login-page'])
  }
}
