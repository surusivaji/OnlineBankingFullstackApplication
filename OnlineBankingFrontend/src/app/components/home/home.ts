import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Account } from '../interfaces/account';
import { AccountService } from '../services/account-service';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { AddAccount } from '../add-account/add-account';
import { response } from 'express';
import { WithdrawMoney } from '../withdraw-money/withdraw-money';
import { DepositMoney } from '../deposit-money/deposit-money';
import { UpdateAccount } from '../../update-account/update-account';
import { DeleteAccount } from '../../delete-account/delete-account';


@Component({
  selector: 'app-home',
  imports: [
    CommonModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatTableModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {
  accountService = inject(AccountService);
  displayedColumns: string[] = ['accountNumber', 'accountHolderName', 'email', 'mobileNumber', 'accountBalance', 'actions'];
  dataSource = new MatTableDataSource<Account>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  accounts:Account[] = [];
  filter: any = '';
  public dialog = inject(MatDialog);

  ngAfterViewInit(): void {
    this.loadAllTheAccounts();
  }
  
  loadAllTheAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next : (response : Account[]) => {
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
      },
      error : (error : any) => {
        console.log(error);
      }
    })
  }

  searchAccounts() {
    this.dataSource.filter = this.filter.trim().toLowerCase();
  }

  addAccount() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = 'auto';
    dialogConfig.maxHeight = '100vh';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    const dialogBox = this.dialog.open(AddAccount, dialogConfig); 
    dialogBox.componentInstance.eventEmitter.subscribe({
      next : (response : any) => {
        this.loadAllTheAccounts();
      }
    })
  }

  withdrawMoney(accountNumber : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = 'auto';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      "accountNumber" : accountNumber
    }
    const dialogBox = this.dialog.open(WithdrawMoney, dialogConfig);
    dialogBox.componentInstance.eventEmitter.subscribe({
      next : (response : any) => {
        this.loadAllTheAccounts();
      }
    })
  }

  depositMoney(accountNumber : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = 'auto';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      "accountNumber" : accountNumber
    }
    const dialogBox = this.dialog.open(DepositMoney, dialogConfig);
    dialogBox.componentInstance.eventEmitter.subscribe({
      next : (response : any) => {
        this.loadAllTheAccounts();
      }
    })
  }

  editAccount(account : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = 'auto';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      "account" : account
    }
    const dialogBox = this.dialog.open(UpdateAccount, dialogConfig);
    dialogBox.componentInstance.eventEmitter.subscribe({
      next: (response : any) => {
        this.loadAllTheAccounts();
      }
    })
  }

  deleteAccount(id : any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px';
    dialogConfig.height = 'auto';
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      "accountNumber" : id
    } 
    const dialogBox = this.dialog.open(DeleteAccount, dialogConfig);
    dialogBox.componentInstance.eventEmitter.subscribe({
      next: (response : any) => {
        this.loadAllTheAccounts();
      }
    })
  }

}
