import { Component, OnInit, ElementRef, ViewChild, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-entry-details',
  templateUrl: './entry-details.component.html',
  styleUrls: ['./entry-details.component.scss']
})
export class EntryDetailsComponent implements OnInit, AfterViewInit {

  @Input() showModal;

  @ViewChild('modal')
  modal: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    console.log(this.showModal);
    console.log(this.modal);
    if (this.showModal) {
      this.modal.nativeElement.classList.add('is-active');
    } else {
      this.closeModal();
    }
  }

  updateEntry() {

  }

  closeModal() {
    this.modal.nativeElement.classList.remove('is-active');
  }

}
