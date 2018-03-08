import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { RetreatCapacity } from './retreat-capacity.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<RetreatCapacity>;

@Injectable()
export class RetreatCapacityService {

    private resourceUrl =  SERVER_API_URL + 'api/retreat-capacities';

    constructor(private http: HttpClient) { }

    create(retreatCapacity: RetreatCapacity): Observable<EntityResponseType> {
        const copy = this.convert(retreatCapacity);
        return this.http.post<RetreatCapacity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(retreatCapacity: RetreatCapacity): Observable<EntityResponseType> {
        const copy = this.convert(retreatCapacity);
        return this.http.put<RetreatCapacity>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<RetreatCapacity>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<RetreatCapacity[]>> {
        const options = createRequestOption(req);
        return this.http.get<RetreatCapacity[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<RetreatCapacity[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: RetreatCapacity = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<RetreatCapacity[]>): HttpResponse<RetreatCapacity[]> {
        const jsonResponse: RetreatCapacity[] = res.body;
        const body: RetreatCapacity[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to RetreatCapacity.
     */
    private convertItemFromServer(retreatCapacity: RetreatCapacity): RetreatCapacity {
        const copy: RetreatCapacity = Object.assign({}, retreatCapacity);
        return copy;
    }

    /**
     * Convert a RetreatCapacity to a JSON which can be sent to the server.
     */
    private convert(retreatCapacity: RetreatCapacity): RetreatCapacity {
        const copy: RetreatCapacity = Object.assign({}, retreatCapacity);
        return copy;
    }
}
