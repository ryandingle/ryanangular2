import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { LikeModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class LikeService {

    constructor(private http: Http) { }

    private url       = 'http://ryandingle.co,nf/api/v1';
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