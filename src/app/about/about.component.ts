import { Component, OnInit } from '@angular/core';
import { PaceService } from '../shared';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(
      private pace: PaceService
  ) { }

  ngOnInit() {
      this.pace.removePace();
  }

}
