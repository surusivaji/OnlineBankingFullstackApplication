import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AccountService } from '../components/services/account-service';
import { ToastrService } from 'ngx-toastr';
import { GlobalProperties } from '../../shared/GlobalProperties';
import { error } from 'console';

@Component({
  selector: 'app-delete-account',
  imports: [CommonModule, MatDialogModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDividerModule],
  templateUrl: './delete-account.html',
  styleUrl: './delete-account.css',
})
export class DeleteAccount {
  accountNumber: any;
  accountService = inject(AccountService);
  toastr = inject(ToastrService);
  matDialogRef = inject(MatDialogRef<DeleteAccount>);
  eventEmitter = new EventEmitter();
  
  public constructor(@Inject(MAT_DIALOG_DATA) matDialogData : any) {
    this.accountNumber = matDialogData.accountNumber;
  }

  deleteAccountInformation() {
    this.accountService.deleteAccount(this.accountNumber).subscribe({
      next : (response : any) => {
        this.toastr.success("Account deleted successfully", "Success", GlobalProperties.toastrConfig);
        this.matDialogRef.close();
        this.eventEmitter.emit();
      },
      error : (error : any) => {
        this.toastr.error(error.error.message, "Failed", GlobalProperties.toastrConfig);
        this.matDialogRef.close();
        this.eventEmitter.emit();
      }
    })
  }
}
