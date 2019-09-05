import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  styleUrls: ['./success-popup.component.scss']
})
export class SuccessPopupComponent  {

  constructor(
    public dialogRef: MatDialogRef<SuccessPopupComponent>,
    private router: Router,
  ) { }

  onOkClicked(): void {
    this.dialogRef.close();
    this.router.navigate(['/tournos-search']);
  }

}
