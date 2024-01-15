import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginData = {
    "email" : '',
    "password" : ''
  }

  constructor(private snack:MatSnackBar, private loginService:LoginService) { }

  ngOnInit(): void {}

  formSubmit() {
    //console.log("The login button was clicked")
    if(this.loginData.email.trim() == '' || this.loginData.email.trim() == null) {
      this.snack.open("Email is required !!", "Accept", {
        duration:3000
      })
      return;
    }
    if(this.loginData.password.trim() == '' || this.loginData.password.trim() == null) {
      this.snack.open("Password is required !!", "Accept", {
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
      }, (error) => {
        console.log(error);
      }
    )
  }

}
