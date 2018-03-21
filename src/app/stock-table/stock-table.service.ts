import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class StockTableService {
    stocks: any[];
    headers: Headers;
    options: RequestOptions;
    private url = 'http://localhost:8080/stocks';

    stockValue: { dateTime: string, stockPrice: string } = {
        dateTime: "",
        stockPrice: ""
    }

    constructor(private http: Http) {
    }

    getStocks(): Observable<any> {
        return this.http.get(this.url);
    }
    
    getIndices(): Observable<any> {
        return this.http.get('http://localhost:8080/index');
    }

    createStock(stock): Observable<any> {
        return this.http.post(this.url, JSON.stringify(stock));
    }

    updateStock(updatestockCode, updatestockName, updatestockValueId, updatedateTime, updatestockPrice): Observable<any> {
        this.headers = new Headers({
            'Content-Type': 'application/json',
        });
        this.options = new RequestOptions({ headers: this.headers });
        this.stockValue = {
            dateTime: updatedateTime,
            stockPrice: updatestockPrice
        }
        let body = JSON.stringify(this.stockValue);
        return this.http
            .put(this.url + '/' + updatestockCode + '/' + updatestockValueId, JSON.stringify({
                _id: updatestockValueId,
                dateTime: updatedateTime,
                stockPrice: updatestockPrice
            }), this.options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    deleteStock(stockCode, _id): Observable<any> {
        return this.http.delete(this.url + '/' + stockCode + '/' + _id);
    }

}