import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { 
  SiteModel, 
  SiteService, 
  PaceService 
} from '../shared';

@Component({
  selector: 'app-contact"',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(
     private site: SiteService,
     private pace: PaceService
  ) { }

  sitedata: SiteModel[] = [];
  form: any;

  ngOnInit() {
    this.site.getSite().then(response => this.sitedata = response);
    this.createForm();
    this.pace.removePace();
  }


  createForm() {
      this.form = new FormGroup({
          name: new FormControl(),
          email: new FormControl(),
          phone: new FormControl(),
          message: new FormControl(),
      });
  }

}
