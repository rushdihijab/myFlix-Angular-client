import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {
  @Input() userData = { Username: this.data.Username, Password: '', Email: this.data.Email, Birthday: this.data.Birthday };

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Username: string, Email: string, Birthday: any },
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  // Called once the component has received all its inputs from the real-life user
  ngOnInit(): void { }

  /**
   * Update user data on database via API as well as localStorage 
   * and updates profile page
   * @function editUserInfo
   */
  editUserInfo(): void {
    this.fetchApiData.editUser(this.userData).subscribe({
      next: (result) => {
        console.log(result);
        localStorage.setItem('user', result.Username);
        this.dialogRef.close(); // Close the modal on success
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 2000 });
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open(error, 'OK', { duration: 2000 })
      }
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
