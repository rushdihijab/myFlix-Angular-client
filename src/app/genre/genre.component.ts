import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.scss']
})
export class GenreComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Name: string, Description: string },
    public dialogRef: MatDialogRef<GenreComponent>
  ) { }

  /**
   * Close dialog
   * @function closeDialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
