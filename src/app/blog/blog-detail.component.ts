import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validator } from '@angular/forms';

@Component({
  selector: 'app-blog',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {

  constructor() { }

  form: any;

  ngOnInit() {
      this.createForm();
  }

  createForm() {
      this.form = new FormGroup({
          name: new FormControl(),
          email: new FormControl(),
          website: new FormControl(),
          comment: new FormControl(),
          subscribe: new FormControl()
      });
  }

}
