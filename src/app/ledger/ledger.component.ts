import { Component, OnInit, OnDestroy } from '@angular/core';
import { LedgerService } from '../shared/ledger.service';
import { Entry } from '../shared/entry.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit, OnDestroy {
  incomes: Entry[];
  expenses: Entry[];
  incomesSubscription : Subscription;
  expensesSubscription : Subscription;

  constructor(private ledgerService: LedgerService) { }

  ngOnInit(): void {
    this.incomes = this.ledgerService.getAllIncomes();
    this.expenses = this.ledgerService.getAllExpenses();
    this.incomesSubscription = this.ledgerService.incomesObserver.subscribe((incomes: Entry[])=> this.incomes = incomes);
    this.expensesSubscription = this.ledgerService.expensesObserver.subscribe((expenses: Entry[])=> this.expenses = expenses);
  }

  ngOnDestroy(): void {
    this.expensesSubscription.unsubscribe();
    this.incomesSubscription.unsubscribe();
  }

}
