import { TabComponent } from './components/tab/tab.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot([
    { path: '', component: WelcomeComponent},
    { path: 'app', component: TabComponent },
    { path: '**', redirectTo: '' },
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
