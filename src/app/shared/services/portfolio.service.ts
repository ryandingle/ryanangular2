import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { PortfolioModel  }  from '../models';
import '../rxjs-operator';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class PortfolioService {

    constructor(private http: Http) { }

    private url = 'http://localhost/portfolioapi/api/v1';
    private getHeader = new Headers({'Content-Type': 'application/json'});
    private postHeader = null;//new Headers({'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'});

    get(data: any): Promise<PortfolioModel[]>{
        return this.http.post(this.url+'/project', data ,{headers: this.postHeader})
            .toPromise()
            .then(response => response.json() as PortfolioModel[])
            .catch(this.handleError);
    }

    getItem(id: any): Promise<PortfolioModel>{
        return this.http.get(this.url+'/project/'+id+'/get' ,{headers: this.getHeader})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    getEdit(id: any): Promise<PortfolioModel>{
        return this.http.get(this.url+'/project/'+id+'/edit' ,{headers: this.getHeader})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    delete(id: any): Promise<PortfolioModel>{
        return this.http.post(this.url+'/project/'+id+'/delete' ,{headers: this.postHeader})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    insert(data: any): Promise<PortfolioModel>{
        return this.http.post(this.url+'/project/post', data ,{headers: this.postHeader})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    update(data: any, id: any): Promise<PortfolioModel>{
        return this.http.post(this.url+'/project/'+id+'/update', data ,{headers: this.postHeader})
            .toPromise()
            .then(response => response.json() as PortfolioModel)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}