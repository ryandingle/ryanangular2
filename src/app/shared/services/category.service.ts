import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CategoryModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class CategoryService {

    constructor(private http: Http) { }

    private url = 'http://localhost/portfolioapi/api/v1';
    private headers = new Headers({'Content-Type': 'application/json'});

    get(): Promise<CategoryModel[]>{
      return this.http.get(this.url+'/site', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as CategoryModel[])
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}