import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { TagModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class TagService {

    constructor(private http: Http) { }

    private url = 'http://localhost/portfolioapi/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    list(): Promise<TagModel[]>{
      return this.http.get(this.url+'/tag', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as TagModel[])
        .catch(this.handleError);
    }

    store(data:any): Promise<TagModel[]>{
      return this.http.post(this.url+'/tag/post', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as TagModel[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}