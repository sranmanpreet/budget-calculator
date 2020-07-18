import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LedgerService } from '../shared/ledger.service';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit {

  constructor(private ledgerService: LedgerService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm){
    if(f.valid){
      let entry = new Entry();
      entry.amount = f.value.amount;
      entry.description = f.value.description;
      this.ledgerService.addEntry(entry);
      f.reset();
    }
  }

}
