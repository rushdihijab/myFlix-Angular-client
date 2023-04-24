import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.scss']
})
export class DirectorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { Name: string, Bio: string, Birth: string },
    public dialogRef: MatDialogRef<DirectorComponent>
  ) { }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
