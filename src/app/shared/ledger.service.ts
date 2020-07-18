import { Injectable } from '@angular/core';
import { Entry } from './entry.model';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private incomes: Entry[];
  private expenses: Entry[];
  balanceObserver = new Subject<number>();

  constructor() {
    this.incomes = [
      { amount: 500, description: "Web Design" },
      { amount: 700, description: "Paintings" },
      { amount: 900, description: "Website Development" },
      { amount: 1200, description: "Printed T Shirts" }
    ];
    this.expenses = [
      { amount: -100, description: "Groceries" },
      { amount: -250, description: "Outings" },
      { amount: -300, description: "Electricity" },
      { amount: -800, description: "Rent" }
    ];
    this.calculateBalance();
  }

  getAllIncomes() {
    return this.incomes;
  }

  getIncomeByIndex(index: number) {
    return this.incomes[index];
  }

  deleteIncomeEntry(index: number) {
    this.incomes.splice(index, 1);
    this.calculateBalance();
    return this.incomes;
  }

  getAllExpenses() {
    return this.expenses;
  }

  getExpenseByIndex(index: number) {
    return this.expenses[index];
  }

  deleteExpenseEntry(index: number) {
    this.expenses.splice(index, 1);
    this.calculateBalance();
    return this.expenses;
  }

  addEntry(entry: Entry) {
    if (entry.amount > 0) {
      this.incomes.push(entry);
    } else if (entry.amount < 0) {
      this.expenses.push(entry);
    }
    this.calculateBalance();
  }

  calculateBalance() {
    let totalIncome = this.incomes.reduce((sum, income) => sum + income.amount, 0);
    let totalExpense = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.balanceObserver.next(totalIncome + totalExpense);
  }
}
