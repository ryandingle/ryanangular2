import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CounterModel  }  from '../models';
import '../rxjs-operator';
import { DomainService } from '../../shared';

@Injectable()
export class CounterService {

    constructor(private http: Http,
    private domain: DomainService) { }

    private url       = this.domain.url;//'http://portfolioapi.app/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    get(): Promise<CounterModel>{
      return this.http.get(this.url+'/counters', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as CounterModel)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}