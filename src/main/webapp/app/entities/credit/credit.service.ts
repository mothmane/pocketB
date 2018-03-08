import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Credit } from './credit.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Credit>;

@Injectable()
export class CreditService {

    private resourceUrl =  SERVER_API_URL + 'api/credits';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(credit: Credit): Observable<EntityResponseType> {
        const copy = this.convert(credit);
        return this.http.post<Credit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(credit: Credit): Observable<EntityResponseType> {
        const copy = this.convert(credit);
        return this.http.put<Credit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Credit>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Credit[]>> {
        const options = createRequestOption(req);
        return this.http.get<Credit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Credit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Credit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Credit[]>): HttpResponse<Credit[]> {
        const jsonResponse: Credit[] = res.body;
        const body: Credit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Credit.
     */
    private convertItemFromServer(credit: Credit): Credit {
        const copy: Credit = Object.assign({}, credit);
        copy.endingLocalDate = this.dateUtils
            .convertLocalDateFromServer(credit.endingLocalDate);
        return copy;
    }

    /**
     * Convert a Credit to a JSON which can be sent to the server.
     */
    private convert(credit: Credit): Credit {
        const copy: Credit = Object.assign({}, credit);
        copy.endingLocalDate = this.dateUtils
            .convertLocalDateToServer(credit.endingLocalDate);
        return copy;
    }
}
