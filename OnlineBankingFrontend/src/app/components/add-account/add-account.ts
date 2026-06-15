import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account-service';
import { Account } from '../interfaces/account';
import { GlobalProperties } from '../../../shared/GlobalProperties';

@Component({
  selector: 'app-add-account',
  imports: [
    CommonModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-account.html',
  styleUrl: './add-account.css',
})
export class AddAccount implements OnInit {
  createAccountForm: any = FormGroup;
  formBuilder = inject(FormBuilder);
  toaster = inject(ToastrService);
  accountService = inject(AccountService);
  dialogRef = inject(MatDialogRef<AddAccount>);
  eventEmitter = new EventEmitter();
  ngOnInit(): void {
    this.createAccountForm = this.formBuilder.group({
      fullName : ['', Validators.required],
      email : ['', Validators.required],
      mobileNumber : ['', Validators.required],
      accountBalance : ['', Validators.required]
    })
  }

  saveAccountInformation() {
    const formData = this.createAccountForm.value;
    console.log(formData);
    const account = {
      accountHolderName: formData.fullName,
      email: formData.email,
      mobileNumber: formData.mobileNumber,
      accountBalance: formData.accountBalance
    }
    this.accountService.createAccount(account).subscribe({
      next : (response : any) => {
        this.toaster.success("Account created successfully", "Success", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      },
      error : (error : any) => {
        this.toaster.error(error.error.message, "Failed", GlobalProperties.toastrConfig);
        this.dialogRef.close();
        this.eventEmitter.emit();
      }
    })
  }

}
