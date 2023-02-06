import { Component } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent {
  index = 1;

  constructor() { 
    this.index = 0
  }

  changeTabOnSubmit(e: boolean) {
    if(e) {
      this.index += 1
    }
  }

  changeTab(e: number) {
    if(e) {
      this.index = e;
    }
  }

}
