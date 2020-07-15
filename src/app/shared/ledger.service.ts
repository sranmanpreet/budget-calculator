import { Injectable } from '@angular/core';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class LedgerService {
  private incomes: Entry[];
  private expenses: Entry[];

  constructor() { }

  getAllIncomes(){
    return this.incomes;
  }

  getIncomeByIndex(index: number){
    return this.incomes[index];
  }

  addEntry(entry: Entry){
    if(entry.amount>0){
      this.incomes.push(entry);
    } else if(entry.amount <0){
      this.expenses.push(entry);
    } 
  }

  deleteEntry(entry: Entry){

  }
}
