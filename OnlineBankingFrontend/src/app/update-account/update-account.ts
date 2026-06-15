import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Account } from '../components/interfaces/account';
import { AccountService } from '../components/services/account-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalProperties } from '../../shared/GlobalProperties';

@Component({
  selector: 'app-update-account',
  imports: [CommonModule, MatDialogModule, MatToolbarModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './update-account.html',
  styleUrl: './update-account.css',
})
export class UpdateAccount implements OnInit {
  private account: Account;
  updateAccount:any = FormGroup;
  formBuilder = inject(FormBuilder);
  accountService = inject(AccountService);
  toastr = inject(ToastrService);
  dialogRef = inject(MatDialogRef<UpdateAccount>);
  eventEmitter = new EventEmitter();
  
  constructor(@Inject(MAT_DIALOG_DATA) public matDialogdata: any) {
    this.account = this.matDialogdata.account;
    console.log(this.account);
  }

  ngOnInit(): void {
    this.updateAccount = this.formBuilder.group({
      accountHolderName : ['', Validators.required],
      email : ['', Validators.required],
      mobileNumber : ['', Validators.required]
    })
    this.updateAccount.patchValue({
      accountHolderName : this.account.accountHolderName,
      email : this.account.email,
      mobileNumber : this.account.mobileNumber
    })
  }

  editAccount() {
    const formData = this.updateAccount.value;
    const account = {
      accountNumber: this.account.accountNumber,
      accountHolderName: formData.accountHolderName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      accountBalance: this.account.accountBalance
    }
    this.accountService.updateAccount(account).subscribe({
      next : (response : any) => {
        this.toastr.success("Account updated successfully", "Success", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      },
      error : (error : any) => {
        this.toastr.error(error.error.message, "Failed", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      }
    })
  }
}
