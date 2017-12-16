import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

@Injectable()
export class DomainService {

    constructor(private http: Http) { }

    private domain       = 'https://api.rldwebshop.xyz/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    url(){
      return this.domain;
    }
}