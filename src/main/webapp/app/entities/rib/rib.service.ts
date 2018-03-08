import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RIB } from './rib.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RIB>;

@Injectable()
export class RIBService {

    private resourceUrl =  SERVER_API_URL + 'api/ribs';

    constructor(private http: HttpClient) { }

    create(rIB: RIB): Observable<EntityResponseType> {
        const copy = this.convert(rIB);
        return this.http.post<RIB>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(rIB: RIB): Observable<EntityResponseType> {
        const copy = this.convert(rIB);
        return this.http.put<RIB>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RIB>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RIB[]>> {
        const options = createRequestOption(req);
        return this.http.get<RIB[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RIB[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RIB = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RIB[]>): HttpResponse<RIB[]> {
        const jsonResponse: RIB[] = res.body;
        const body: RIB[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RIB.
     */
    private convertItemFromServer(rIB: RIB): RIB {
        const copy: RIB = Object.assign({}, rIB);
        return copy;
    }

    /**
     * Convert a RIB to a JSON which can be sent to the server.
     */
    private convert(rIB: RIB): RIB {
        const copy: RIB = Object.assign({}, rIB);
        return copy;
    }
}
