import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { TagModel, Errors  }  from '../models';
import '../rxjs-operator';
import { DomainService } from '../../shared';

@Injectable()
export class TagService {

    constructor(private http: Http,
    private domain: DomainService) { }

    private url       = 'https://api.rldwebshop.xyz/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    list(): Promise<TagModel[]>{
      return this.http.get(this.url+'/tag', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as TagModel[])
        .catch(this.handleError);
    }

    list2(data: any): Promise<TagModel[]>{
      return this.http.post(this.url+'/tag/list', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as TagModel[])
        .catch(this.handleError);
    }

    edit(id: any): Promise<TagModel>{
      return this.http.get(this.url+'/tag/'+id+'/edit' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as TagModel)
        .catch(this.handleError);
    }

    delete(id: any): Promise<Errors>{
      return this.http.post(this.url+'/tag/'+id+'/delete' ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    store(data: any): Promise<Errors>{
      return this.http.post(this.url+'/tag/post', data, {headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    update(data: any, id: any): Promise<Errors>{
      return this.http.post(this.url+'/tag/'+id+'/update', data ,{headers: this.headers})
        .toPromise()
        .then(response => response.json() as Errors)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}