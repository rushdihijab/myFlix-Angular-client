import { Component, OnInit, Input, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditFormComponent } from '../edit-form/edit-form.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Fetch user data via API and set user state to returned data
   * @return user object
   * @function getUserInfo
   */
  getUserInfo(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      // console.log(this.user);
      return this.user;
    })
  }

  /**
   * Delete user from database via API, clear user data from localStorage
   * and navigate to welcome page
   * @function deleteUser
   */
  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannnot be undone.')) {
      this.router.navigate(['welcome']).then(() => {
        localStorage.clear(); // Clear user data on localStorage
        this.snackBar.open('You have successfully deleted your account!', 'OK', {
          duration: 3000
        });
      });
    }

    this.fetchApiData.deleteUser().subscribe(res => {
      console.log('deleteAccountRes:', res);
    })
  }

  /**
   * Open form dialog for editting user profile and pass current user data to the form
   * @param Username 
   * @param Email 
   * @param Birthday
   * @function openEditFormDialog 
   */
  openEditFormDialog(Username: string, Email: string, Birthday: any): void {
    this.dialog.open(EditFormComponent, {
      data: {
        Username, Email, Birthday
      }
    })
  }
}
