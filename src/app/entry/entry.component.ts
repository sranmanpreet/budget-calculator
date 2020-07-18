import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Entry } from '../shared/entry.model';
import { LedgerService } from '../shared/ledger.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, AfterViewInit {

  @ViewChild('entryDescription') eDescription: ElementRef;
  @ViewChild('entryAmount') eAmount: ElementRef;
  @ViewChild('modal') modal: ElementRef;

  @Input() entry: Entry;
  @Input() isExpense: boolean = false;
  @Input() entryId: number;

  constructor(private ledgerService: LedgerService) { }

  ngAfterViewInit(): void {
    if (this.isExpense) {
      this.eDescription.nativeElement.classList.add('is-expense-description');
      this.eAmount.nativeElement.classList.add('is-expense-amount');
    } else {
      this.eDescription.nativeElement.classList.remove('is-expense-description');
      this.eAmount.nativeElement.classList.remove('is-expense-amount');

    }
  }

  ngOnInit(): void {
  }

  delete() {
    if (this.isExpense) {
      this.ledgerService.deleteExpenseEntry(this.entryId);
    } else {
      this.ledgerService.deleteIncomeEntry(this.entryId);
    }
  }

  showDetails() {
    this.modal.nativeElement.classList.add("is-active");
  }

  closeModal() {
    this.modal.nativeElement.classList.remove("is-active");
  }

  updateEntry() {
    this.ledgerService.updateEntry(this.entry, this.entryId, this.isExpense);
    this.closeModal();
  }

}
