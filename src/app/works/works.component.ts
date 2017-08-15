import { Component, OnInit } from '@angular/core';
import { PaceService } from '../shared';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  constructor(
      private pace: PaceService
  ) { }

  ngOnInit() {

      this.pace.removePace();
  }

}
