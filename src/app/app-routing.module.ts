import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { EntryDetailsComponent } from './entry-details/entry-details.component';


const routes: Routes = [
  { path: '', component: MainLayoutComponent },
  { path: 'entry', component: EntryDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
