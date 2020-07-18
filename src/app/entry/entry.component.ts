import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Entry } from '../shared/entry.model';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit, AfterViewInit {

  @ViewChild('entryDescription') eDescription: ElementRef;
  @ViewChild('entryAmount') eAmount: ElementRef;

  @Input() entry: Entry;

  @Input() isExpense: boolean = false;

  showEntryDetail: boolean = false;

  constructor() { }

  ngAfterViewInit(): void {
    if(this.isExpense){
      this.eDescription.nativeElement.classList.add('is-expense-description');
      this.eAmount.nativeElement.classList.add('is-expense-amount');
    } else {
      this.eDescription.nativeElement.classList.remove('is-expense-description');
      this.eAmount.nativeElement.classList.remove('is-expense-amount');

    }
  }

  ngOnInit(): void {
  }

  showDetails(){
    this.showEntryDetail = true;
  }

}
