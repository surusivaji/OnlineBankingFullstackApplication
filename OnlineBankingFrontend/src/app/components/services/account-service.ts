import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  http = inject(HttpClient);

  baseUrl = "/onlineBanking";

  getAllAccounts() : Observable<Account[]> {
    return this.http.get<Account[]>(`${this.baseUrl}/accounts`);
  }

  createAccount(account : Account) {
    return this.http.post<Account>(`${this.baseUrl}/save`, account);
  }

  withdrawMoney(accountNumber: number, money: number) {
    return this.http.patch<Account>(`${this.baseUrl}/withdraw/${accountNumber}?money=${money}`,{});
  }

  depositMoney(accountNumber:number, money: number) {
    return this.http.patch<Account>(`${this.baseUrl}/deposit/${accountNumber}?money=${money}`,{});
  }

  updateAccount(account : Account) {
    return this.http.put<Account>(`${this.baseUrl}/updateAccount`, account);
  }

  deleteAccount(accountNumber : number) {
    return this.http.delete<Account>(`${this.baseUrl}/deleteAccount/${accountNumber}`);
  }

}
