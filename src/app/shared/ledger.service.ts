import { Injectable } from '@angular/core';
import { Entry } from './entry.model';
import { Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private incomes: Entry[];
  private expenses: Entry[];
  balanceObserver = new Subject<number>();
  incomesObserver = new Subject<Entry[]>();
  expensesObserver = new Subject<Entry[]>();

  constructor(private cookieService: CookieService) {
    this.incomes = [
      { amount: 900, description: "Web Design" },
      { amount: 1200, description: "Paintings" },
      { amount: 1600, description: "Website Development" },
      { amount: 800, description: "Printed T Shirts" }
    ];
    this.expenses = [
      { amount: -100, description: "Groceries" },
      { amount: -16, description: "Netflix" },
      { amount: -300, description: "Electricity" },
      { amount: -800, description: "Rent" }
    ];
    this.calculateBalance();
  }

  getAllIncomes() {
    this.calculateBalance();
    this.loadIncomesFromStorage();
    return this.incomes;
  }

  deleteIncomeEntry(index: number) {
    this.loadIncomesFromStorage();
    this.incomes.splice(index, 1);
    this.saveIncomes();
    this.calculateBalance();
    this.incomesObserver.next(this.incomes);
    return this.incomes;
  }

  getAllExpenses() {
    this.loadExpensesFromStorage();
    return this.expenses;
  }

  deleteExpenseEntry(index: number) {
    this.loadExpensesFromStorage();
    this.expenses.splice(index, 1);
    this.saveExpenses();
    this.calculateBalance();
    this.expensesObserver.next(this.expenses);
    return this.expenses;
  }

  addEntry(entry: Entry) {
    this.loadExpensesFromStorage();
    this.loadIncomesFromStorage();
    if (entry.amount > 0) {
      this.incomes.push(entry);
      this.saveIncomes();
    } else if (entry.amount < 0) {
      this.expenses.push(entry);
      this.saveExpenses();
    }
    this.expensesObserver.next(this.expenses);
    this.incomesObserver.next(this.incomes);
    this.calculateBalance();
  }

  updateEntry(entry: Entry, index: number, isExpense: boolean) {
    this.loadExpensesFromStorage();
    this.loadIncomesFromStorage();
    if (isExpense) {
      if (entry.amount < 0) {
        this.expenses[index] = entry;
      } else if (entry.amount > 0) {
        this.deleteExpenseEntry(index);
        this.addEntry(entry);
      }
    } else {
      if (entry.amount > 0) {
        this.incomes[index] = entry;
      } else if (entry.amount < 0) {
        this.deleteIncomeEntry(index);
        this.addEntry(entry);
      }
    }
    this.saveExpenses();
    this.saveIncomes();
    this.expensesObserver.next(this.expenses);
    this.incomesObserver.next(this.incomes);
    this.calculateBalance();
  }

  calculateBalance() {
    this.loadExpensesFromStorage();
    this.loadIncomesFromStorage();
    let totalIncome = this.incomes.reduce((sum, income) => sum + income.amount, 0);
    let totalExpense = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    this.balanceObserver.next(totalIncome + totalExpense);
    return totalIncome + totalExpense;
  }

  saveIncomes() {
    this.cookieService.set('incomes', JSON.stringify(this.incomes));
  }
  saveExpenses() {
    this.cookieService.set('expenses', JSON.stringify(this.expenses));
  }

  loadIncomesFromStorage() {
    if (this.cookieService.check('incomes')) {
      this.incomes = JSON.parse(this.cookieService.get('incomes'));
    }
  }

  loadExpensesFromStorage() {
    if (this.cookieService.check('expenses')) {
      this.expenses = JSON.parse(this.cookieService.get('expenses'));
    }
  }
}
