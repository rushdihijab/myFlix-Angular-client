import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void { }

  /**
   * Log out user (clear user data from localStorage) and navigate to welcome page
   * @function logOutUser
   */
  logOutUser(): void {
    const user = localStorage.getItem('user');
    this.snackBar.open(`Goodbye ${user}`, 'OK', {
      duration: 3000
    });
    this.router.navigate(['welcome']);
    localStorage.clear();
  }
}
