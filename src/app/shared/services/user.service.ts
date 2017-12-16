import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { UserModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class UserService {

    constructor(private http: Http) { }

    private url       = 'https://api.rldwebshop.xyz/api/v1';
    private headers   = new Headers({'Accept': 'application/json'});

    get(id): Promise<UserModel>{
      return this.http.get(this.url+'/user/'+id+'/get', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as UserModel)
        .catch(this.handleError);
    }

    update(id, data): Promise<UserModel>{
      return this.http.post(this.url+'/user/'+id+'/update', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as UserModel)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}