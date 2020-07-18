import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LedgerService } from '../shared/ledger.service';
import { Observer, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('balanceElement') be: ElementRef;
  balance: number;

  private balanceSubscription: Subscription;

  constructor(private ledgerService: LedgerService) { }

  ngAfterViewInit(): void {
    this.ledgerService.calculateBalance();
    this.balanceSubscription = this.ledgerService.balanceObserver.subscribe(
      (balance) => {
        this.balance = balance;
        if(this.be){
          if (this.balance < 0) {
            this.be.nativeElement.classList.add('red');
          } else {
            this.be.nativeElement.classList.remove('red');
          }
        }
      });
  }

  ngOnInit(): void {
    this.balanceSubscription = this.ledgerService.balanceObserver.subscribe(
      (balance) => {
        this.balance = balance;
        if(this.be){
          if (this.balance < 0) {
            this.be.nativeElement.classList.add('red');
          } else {
            this.be.nativeElement.classList.remove('red');
          }
        }
      });
  }

  ngOnDestroy(): void {
    if (this.balanceSubscription) {
      this.balanceSubscription.unsubscribe();
    }
  }
}
