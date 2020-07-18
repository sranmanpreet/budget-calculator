import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../shared/ledger.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  incomes: Entry[];
  expenses: Entry[];

  constructor(private ledgerService: LedgerService) { }

  ngOnInit(): void {
    this.incomes = this.ledgerService.getAllIncomes();
    this.expenses = this.ledgerService.getAllExpenses();
  }

}
