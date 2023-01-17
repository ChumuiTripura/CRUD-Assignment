import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-comfirm-delete',
  templateUrl: './comfirm-delete.component.html',
  styleUrls: ['./comfirm-delete.component.css']
})
export class ComfirmDeleteComponent {
  constructor(public dialogRef: MatDialogRef<ComfirmDeleteComponent>) {}
}
