import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BlogModel, TagModel, CategoryModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class BlogService {

    constructor(private http: Http) { }

    private url       = 'http://ryandingle.co,nf/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    list(data: any): Promise<BlogModel[]>{
      return this.http.post(this.url+'/blog', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel[])
        .catch(this.handleError);
    }

    get(id: any): Promise<BlogModel>{
      return this.http.get(this.url+'/blog/'+id+'/get' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    edit(id: any): Promise<BlogModel>{
      return this.http.get(this.url+'/blog/'+id+'/edit' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    delete(id: any): Promise<BlogModel>{
      return this.http.post(this.url+'/blog/'+id+'/delete' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    store(data: any): Promise<BlogModel>{
      return this.http.post(this.url+'/blog/post', data ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    update(data: any, id: any): Promise<BlogModel>{
      return this.http.post(this.url+'/blog/'+id+'/update', data ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    /*getTags(): Promise<TagModel[]>{
      return this.http.get(this.url+'/tags', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as TagModel[])
        .catch(this.handleError);
    }

    getCategories(): Promise<CategoryModel[]>{
      return this.http.get(this.url+'/categories', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as CategoryModel[])
        .catch(this.handleError);
    }*/

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}