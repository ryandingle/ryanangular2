import { Injectable } from '@angular/core';
import { Title }     from '@angular/platform-browser';

@Injectable()
export class PaceService {

	constructor(private title: Title) {}

    removePace() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("pace-running");   //remove the class
    }

    setTitle(title: string) {
    	this.title.setTitle(title);
    }
}