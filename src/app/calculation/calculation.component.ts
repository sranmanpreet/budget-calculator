import { Component, OnInit, OnDestroy } from '@angular/core';
import { LedgerService } from '../shared/ledger.service';
import { Observer, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.scss']
})
export class CalculationComponent implements OnInit, OnDestroy {

  balance: number;

  private balanceSubscription: Subscription;

  constructor(private ledgerService: LedgerService) { }

  ngOnInit(): void {
    this.balanceSubscription = this.ledgerService.balanceObserver.subscribe((balance) => { this.balance = balance; });
  }

  ngOnDestroy(): void {
    if(this.balanceSubscription){
      this.balanceSubscription.unsubscribe();
    }
  }
}
