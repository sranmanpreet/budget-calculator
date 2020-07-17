import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  showEntryDetail: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showDetails(){
    this.showEntryDetail = true;
  }

}
