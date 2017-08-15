import { Component, OnInit } from '@angular/core';
import { PaceService } from '../shared';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(
      private pace: PaceService
  ) { }

  ngOnInit() {
      this.pace.removePace();
  }

}
