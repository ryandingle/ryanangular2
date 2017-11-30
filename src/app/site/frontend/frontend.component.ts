import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frontend',
  templateUrl: './frontend.component.html',
})
export class FrontendComponent implements OnInit {

  constructor() { }


  public active: string = 'home';

  ngOnInit() {
  }

  public setActive(tab) {
    //this.errors = new Errors;
    this.active = tab;
    //this.showForm = false;
    //this.datas.value = '';
    //this.ngOnInit();
  }

}
