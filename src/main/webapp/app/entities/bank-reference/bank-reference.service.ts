import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BankReference } from './bank-reference.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BankReference>;

@Injectable()
export class BankReferenceService {

    private resourceUrl =  SERVER_API_URL + 'api/bank-references';

    constructor(private http: HttpClient) { }

    create(bankReference: BankReference): Observable<EntityResponseType> {
        const copy = this.convert(bankReference);
        return this.http.post<BankReference>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bankReference: BankReference): Observable<EntityResponseType> {
        const copy = this.convert(bankReference);
        return this.http.put<BankReference>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BankReference>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BankReference[]>> {
        const options = createRequestOption(req);
        return this.http.get<BankReference[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BankReference[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BankReference = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BankReference[]>): HttpResponse<BankReference[]> {
        const jsonResponse: BankReference[] = res.body;
        const body: BankReference[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BankReference.
     */
    private convertItemFromServer(bankReference: BankReference): BankReference {
        const copy: BankReference = Object.assign({}, bankReference);
        return copy;
    }

    /**
     * Convert a BankReference to a JSON which can be sent to the server.
     */
    private convert(bankReference: BankReference): BankReference {
        const copy: BankReference = Object.assign({}, bankReference);
        return copy;
    }
}
