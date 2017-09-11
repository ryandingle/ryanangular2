import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PortfolioModel  }  from '../models';
import '../rxjs-operator';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PortfolioService {

    constructor(private http: Http) { }

  private url       = 'http://ryandingle.co.nf/api/v1';
    private headers = new Headers({'Accept': 'application/json'});
    //private postHeader = null;//new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'});

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

    edit(id: any): Promise<PortfolioModel>{
        return this.http.get(this.url+'/project/'+id+'/edit' ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    delete(id: any): Promise<PortfolioModel>{
        return this.http.post(this.url+'/project/'+id+'/delete' ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    store(data: any): Promise<PortfolioModel>{
        return this.http.post(this.url+'/project/post', data ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    update(data: any, id: any): Promise<PortfolioModel>{
        return this.http.post(this.url+'/project/'+id+'/update', data ,{headers: this.headers})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}