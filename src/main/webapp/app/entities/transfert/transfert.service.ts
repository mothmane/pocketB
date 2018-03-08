import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Transfert } from './transfert.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Transfert>;

@Injectable()
export class TransfertService {

    private resourceUrl =  SERVER_API_URL + 'api/transferts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(transfert: Transfert): Observable<EntityResponseType> {
        const copy = this.convert(transfert);
        return this.http.post<Transfert>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(transfert: Transfert): Observable<EntityResponseType> {
        const copy = this.convert(transfert);
        return this.http.put<Transfert>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Transfert>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Transfert[]>> {
        const options = createRequestOption(req);
        return this.http.get<Transfert[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Transfert[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Transfert = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Transfert[]>): HttpResponse<Transfert[]> {
        const jsonResponse: Transfert[] = res.body;
        const body: Transfert[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Transfert.
     */
    private convertItemFromServer(transfert: Transfert): Transfert {
        const copy: Transfert = Object.assign({}, transfert);
        copy.date = this.dateUtils
            .convertLocalDateFromServer(transfert.date);
        return copy;
    }

    /**
     * Convert a Transfert to a JSON which can be sent to the server.
     */
    private convert(transfert: Transfert): Transfert {
        const copy: Transfert = Object.assign({}, transfert);
        copy.date = this.dateUtils
            .convertLocalDateToServer(transfert.date);
        return copy;
    }
}
