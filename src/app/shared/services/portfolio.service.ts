import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PortfolioModel, Errors  }  from '../models';
import '../rxjs-operator';
import { Observable }     from 'rxjs/Observable';
import { DomainService } from '../../shared';

@Injectable()
export class PortfolioService {

    constructor(private http: Http,
    private domain: DomainService) { }

    private url       = 'http://api.rldwebshop.xyz/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    list(data: any): Promise<PortfolioModel[]>{
        return this.http.post(this.url+'/project', data ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as PortfolioModel[])
            .catch(this.handleError);
    }

    get(id: any): Promise<PortfolioModel>{
        return this.http.get(this.url+'/project/'+id+'/get' ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    getRecentPost(): Promise<PortfolioModel[]>{
      return this.http.get(this.url+'/project/recent-post', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as PortfolioModel[])
        .catch(this.handleError);
    }

    edit(id: any): Promise<PortfolioModel>{
        return this.http.get(this.url+'/project/'+id+'/edit' ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    delete(id: any): Promise<Errors>{
        return this.http.post(this.url+'/project/'+id+'/delete' ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as Errors)
            .catch(this.handleError);
    }

    store(data: any): Promise<Errors>{
        return this.http.post(this.url+'/project/post', data ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as Errors)
            .catch(this.handleError);
    }

    update(data: any, id: any): Promise<Errors>{
        return this.http.post(this.url+'/project/'+id+'/update', data ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as Errors)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}