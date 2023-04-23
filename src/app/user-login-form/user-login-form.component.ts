import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  // styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' }

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * Send the form inputs to the backend via API, store user data on localStorage 
   * and navigate to main page(/movies)
   * {@link FetchApiDataService}
   * @function loginUser
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({
      next: (result) => {
        // console.log(result);
        // Store username and token on localStorage
        localStorage.setItem('user', result.user.Username);
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open(`Welcome Back ${this.userData.Username}`, 'OK', { duration: 2000 });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 2000 })
      }
    })
  }
}
