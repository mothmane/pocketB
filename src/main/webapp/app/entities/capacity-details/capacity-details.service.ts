import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CapacityDetails } from './capacity-details.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CapacityDetails>;

@Injectable()
export class CapacityDetailsService {

    private resourceUrl =  SERVER_API_URL + 'api/capacity-details';

    constructor(private http: HttpClient) { }

    create(capacityDetails: CapacityDetails): Observable<EntityResponseType> {
        const copy = this.convert(capacityDetails);
        return this.http.post<CapacityDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(capacityDetails: CapacityDetails): Observable<EntityResponseType> {
        const copy = this.convert(capacityDetails);
        return this.http.put<CapacityDetails>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CapacityDetails>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CapacityDetails[]>> {
        const options = createRequestOption(req);
        return this.http.get<CapacityDetails[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CapacityDetails[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CapacityDetails = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CapacityDetails[]>): HttpResponse<CapacityDetails[]> {
        const jsonResponse: CapacityDetails[] = res.body;
        const body: CapacityDetails[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CapacityDetails.
     */
    private convertItemFromServer(capacityDetails: CapacityDetails): CapacityDetails {
        const copy: CapacityDetails = Object.assign({}, capacityDetails);
        return copy;
    }

    /**
     * Convert a CapacityDetails to a JSON which can be sent to the server.
     */
    private convert(capacityDetails: CapacityDetails): CapacityDetails {
        const copy: CapacityDetails = Object.assign({}, capacityDetails);
        return copy;
    }
}
