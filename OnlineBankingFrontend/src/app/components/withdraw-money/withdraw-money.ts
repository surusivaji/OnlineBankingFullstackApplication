import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatAnchor } from "@angular/material/button";
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account-service';
import { GlobalProperties } from '../../../shared/GlobalProperties';

@Component({
  selector: 'app-withdraw-money',
  imports: [CommonModule, MatDialogModule, MatToolbarModule, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatAnchor],
  templateUrl: './withdraw-money.html',
  styleUrl: './withdraw-money.css',
})
export class WithdrawMoney implements OnInit {
  accountNumber:any;
  public constructor(@Inject(MAT_DIALOG_DATA) public matDialogdata: any) {
    this.accountNumber = this.matDialogdata.accountNumber;
    console.log(this.accountNumber);
  }
  withdrawForm : any = FormGroup;
  formBuilder = inject(FormBuilder);
  toastr = inject(ToastrService);
  accountService = inject(AccountService);
  dialogRef = inject(MatDialogRef<WithdrawMoney>);
  eventEmitter = new EventEmitter();
  ngOnInit() {
    this.withdrawForm = this.formBuilder.group({
      amount : ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }
  withdrawMoney() {
    const formData = this.withdrawForm.value;
    this.accountService.withdrawMoney(this.accountNumber, formData.amount).subscribe({
      next : (response : any) => {
        this.toastr.success("Money withdrawn successfully", "Success", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      },
      error: (error : any) => {
        this.toastr.error(error.error.message, "Error", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      }
    });
  }
}
