import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    
    private url       = 'http://ryandingle.co,nf/api/v1';
    private headers = new Headers({'Content-Type': 'application/json'});

    get(): Promise<UserModel[]>{
      return this.http.get(this.url+'/blog', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as UserModel[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}