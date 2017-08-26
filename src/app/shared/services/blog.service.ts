import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { BlogModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class BlogService {

    constructor(private http: Http) { }

    private url = 'http://localhost/portfolioapi/api/v1';
    private headers = new Headers({'Content-Type': 'application/json'});
    //res.headers = new Headers({'Access-Control-Allow-Origin': '*'});
    //res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    get(data: any): Promise<BlogModel[]>{
      return this.http.post(this.url+'/blog', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel[])
        .catch(this.handleError);
    }

    getItem(id: any): Promise<BlogModel>{
      return this.http.get(this.url+'/blog/'+id+'/get' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    getEdit(id: any): Promise<BlogModel>{
      return this.http.get(this.url+'/blog/'+id+'/edit' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    delete(id: any): Promise<BlogModel>{
      return this.http.get(this.url+'/blog/'+id+'/delete' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as BlogModel)
        .catch(this.handleError);
    }

    insert(data: any): Promise<BlogModel>{
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

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}