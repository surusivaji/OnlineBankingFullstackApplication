import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account-service';
import { MatButtonModule } from "@angular/material/button";
import { GlobalProperties } from '../../../shared/GlobalProperties';

@Component({
  selector: 'app-deposit-money',
  imports: [CommonModule, MatDialogModule, MatToolbarModule, MatDividerModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './deposit-money.html',
  styleUrl: './deposit-money.css',
})
export class DepositMoney implements OnInit {
  accountNumber : any;
  public constructor(@Inject(MAT_DIALOG_DATA) public matDialogdata: any) {
    this.accountNumber = this.matDialogdata.accountNumber;
    console.log(this.accountNumber);
  }
  depositForm : any = FormGroup;
  formBuilder = inject(FormBuilder);
  toastr = inject(ToastrService);
  accountService = inject(AccountService);
  dialogRef = inject(MatDialogRef<DepositMoney>);
  eventEmitter = new EventEmitter();
  ngOnInit() {
    this.depositForm = this.formBuilder.group({
      amount : ['', [Validators.required, Validators.pattern("^[0-9]*$")]]
    });
  }

  creditMoney() {
    const formData = this.depositForm.value;
    this.accountService.depositMoney(this.accountNumber, formData.amount).subscribe({
      next : (response : any) => {
        this.toastr.success("Money deposited successfully", "Success", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      },
      error: (error : any) => {
        this.toastr.error(error.error.message, "Error", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      }
    })
  }
  
}
