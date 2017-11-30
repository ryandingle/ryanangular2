import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SiteModel, SocialModel, Errors  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class SiteService {

    constructor(private http: Http) { }

    private url       = 'http://portfolioapi.app/api/v1';
    private headers = new Headers({'Accept': 'application/json'});

    getSite(): Promise<SiteModel[]>{
      return this.http.get(this.url+'/site', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as SiteModel[])
        .catch(this.handleError);
    }

    getSocial(): Promise<SocialModel[]>{
      return this.http.get(this.url+'/social', {headers: this.headers})
        .toPromise()
        .then(response => response.json() as SocialModel[])
        .catch(this.handleError);
    }

    update(data: any, id: any): Promise<SiteModel>{
        return this.http.post(this.url+'/site/'+id+'/update', data, {headers: this.headers})
        .toPromise()
        .then(response=> response.json() as SiteModel)
        .catch(this.handleError);
    }

    store(data: any): Promise<SiteModel>{
        return this.http.post(this.url+'/site/post', data, {headers: this.headers})
        .toPromise()
        .then(response=> response.json() as SiteModel)
        .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}