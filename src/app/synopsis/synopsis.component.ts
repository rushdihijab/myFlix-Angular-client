import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis',
  templateUrl: './synopsis.component.html',
  styleUrls: ['./synopsis.component.scss']
})
export class SynopsisComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Description: string },
    public dialogRef: MatDialogRef<SynopsisComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
