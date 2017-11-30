import { Injectable } from '@angular/core';
import {NotifyService} from 'notify-angular';

@Injectable()
export class AlertService {
	constructor(
	private notify: NotifyService) {}

	public alert(message, type) {
	    if(type == 'success') {
	      this.notify.success(message, {
	        withShadow: true,
	        color: 'white',
	        background: '#53a585',//GREEN#53a585 /RED#E15554
	        timer: 5000,
	        position: {
	          top: 0,
	          right: 0,
	        }
	      });
	    } else if(type == 'info') {
	      this.notify.success(message, {
	        withShadow: true,
	        color: 'white',
	        background: '#65BBD6',//GREEN#53a585 /RED#E15554
	        timer: 5000,
	        position: {
	          top: 0,
	          right: 0,
	        }
	      });
	    } else if(type == 'warning') {
	      this.notify.success(message, {
	        withShadow: true,
	        color: 'white',
	        background: '#FFC052',//GREEN#53a585 /RED#E15554
	        timer: 5000,
	        position: {
	          top: 0,
	          right: 0,
	        }
	      });
	    } else { //danger
	      this.notify.error(message, {
	        withShadow: true,
	        color: 'white',
	        background: '#E15554',//GREEN#53a585 /RED#E15554
	        timer: 5000,
	        position: {
	          top: 0,
	          right: 0,
	        }
	      });
	    }
  	}
}