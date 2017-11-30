import { Component, OnInit } from '@angular/core';
import { PaceService } from '../shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
      private pace: PaceService
  ) { }

  ngOnInit() {
      this.pace.removePace();
  }

}
