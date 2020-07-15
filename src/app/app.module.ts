import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { CalculationComponent } from './calculation/calculation.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { EntryComponent } from './entry/entry.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CalculationComponent,
    ExpenseFormComponent,
    EntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
