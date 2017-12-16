import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BlogModel, TagModel, CategoryModel, Errors  }  from '../models';
import '../rxjs-operator';
import { DomainService } from '../../shared';

@Injectable()
export class BlogService {

    constructor(private http: Http, private domain: DomainService) { }

    private url       = this.domain.url;//'http://portfolioapi.app/api/v1';
    private headers   = new Headers({'Accept': 'application/json'});

    list(data: any): Promise<BlogModel[]>{
      return this.http.post(this.url+'/blog', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel[])
        .catch(this.handleError);
    }

    getRecentPost(): Promise<BlogModel[]>{
      return this.http.get(this.url+'/blog/recent-post', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel[])
        .catch(this.handleError);
    }

    listByCategory(data, id): Promise<BlogModel[]>{
      return this.http.post(this.url+'/blog/'+id+'/post-by-category', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel[])
        .catch(this.handleError);
    }

    getCategoryList(): Promise<CategoryModel[]>{
      return this.http.get(this.url+'/blog/category/list', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as CategoryModel[])
        .catch(this.handleError);
    }

    get(id: any): Promise<BlogModel>{
      return this.http.get(this.url+'/blog/'+id+'/get' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    getBySlug(slug: any): Promise<BlogModel>{
      return this.http.get(this.url+'/blog/'+slug+'/show' ,{headers: this.headers})
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

    delete(id: any): Promise<Errors>{
      return this.http.post(this.url+'/blog/'+id+'/delete' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    store(data: any): Promise<Errors>{
      return this.http.post(this.url+'/blog/post', data ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    update(data: any, id: any): Promise<Errors>{
      return this.http.post(this.url+'/blog/'+id+'/update', data ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}