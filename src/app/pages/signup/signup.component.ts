import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public user = {
    username : '',
    password : '',
    name : '',
    lastname : '',
    email : '',
    phone : ''  
  }

  constructor(private userService : UserService, private snack : MatSnackBar) { }

  ngOnInit(): void {}

  formSubmit() {
    console.log(this.user);
    if(this.user.username == '' || this.user.username == null) {
      this.snack.open("Username is required !!", "Accept", {
        duration : 3000,
        verticalPosition : 'top',
        horizontalPosition : 'right'
      });
      return;
    }

    //Patron observable, para obtener datos, me tengo que suscribir (analogia YouTube)...
    this.userService.addUser(this.user).subscribe(
      (data) => {
        console.log(data);
        Swal.fire('User saved', 'User saved successfully', 'success');
      }, (error) => {
        console.log(error);
        this.snack.open("An error has occurred in the system", "Accept", {
          duration : 3000
        });
      }
    )
  }
}
