import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggingIn = false;

  loginData = {
    'email' : '',
    'password' : ''
  }

  constructor(private snack : MatSnackBar, private loginService : LoginService, private router : Router) { }

  ngOnInit(): void {}

  formSubmit() {
    this.isLoggingIn = true;

    this.loginService.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log(data);
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user:any) =>{
          this.loginService.setUser(user);
          console.log(user);

          if(this.loginService.getUserRole() == 'ADMIN') {
            //window.location.href = "/admin";
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true);
          }else if(this.loginService.getUserRole() == 'USER') {
            //window.location.href = "/user-dashboard";
            this.router.navigate(['user-dashboard']);
            this.loginService.loginStatusSubject.next(true);
          }else {
            this.loginService.logout();
          }
        })
      }, (error) => {
        console.log(error);
        if (error.status === 401) {
          this.snack.open('Invalid email or password', 'Accept', {
            duration: 3000,
          });
        } else {
          this.snack.open('An unexpected error occurred', 'Accept', {
            duration: 3000,
          });
        }
        this.isLoggingIn = false;
      }
    )
  }

}
