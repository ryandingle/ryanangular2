import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { SiteModel, SocialModel  }  from '../models';
import '../rxjs-operator';

@Injectable()
export class SiteService {

    constructor(private http: Http) { }

    private url       = 'http://ryandingle.co,nf/api/v1';
    private headers = new Headers({'Content-Type': 'application/json'});

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

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}