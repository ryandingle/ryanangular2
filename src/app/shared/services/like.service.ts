import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { LikeModel  }  from '../models';
import '../rxjs-operator';
import { DomainService } from '../../shared';

@Injectable()
export class LikeService {

    constructor(private http: Http,
    private domain: DomainService) { }

    private url       = 'https://api.rldwebshop.xyz/api/v1';
    private headers = new Headers({'Content-Type': 'application/json'});

    get(): Promise<LikeModel[]>{
      return this.http.get(this.url+'/site', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as LikeModel[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}