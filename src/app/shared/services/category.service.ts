import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { CategoryModel, Errors  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class CategoryService {

    constructor(private http: Http) { }

    private url       = 'https://api.rldwebshop.xyz/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    list(): Promise<CategoryModel[]>{
      return this.http.get(this.url+'/category', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as CategoryModel[])
        .catch(this.handleError);
    }

    list2(data: any): Promise<CategoryModel[]>{
      return this.http.post(this.url+'/category/list', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as CategoryModel[])
        .catch(this.handleError);
    }

    edit(id: any): Promise<CategoryModel>{
      return this.http.get(this.url+'/category/'+id+'/edit' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as CategoryModel)
        .catch(this.handleError);
    }

    delete(id: any): Promise<Errors>{
      return this.http.post(this.url+'/category/'+id+'/delete' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    store(data: any): Promise<Errors>{
      return this.http.post(this.url+'/category/post', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    update(data: any, id: any): Promise<Errors>{
      return this.http.post(this.url+'/category/'+id+'/update', data ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}