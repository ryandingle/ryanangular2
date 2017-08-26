import { Injectable } from '@angular/core';

@Injectable()
export class PaceService {

    removePace() {
        let body = document.getElementsByTagName('body')[0];
        body.classList.remove("pace-running");   //remove the class
    }
}