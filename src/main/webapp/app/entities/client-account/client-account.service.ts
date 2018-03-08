import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ClientAccount } from './client-account.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ClientAccount>;

@Injectable()
export class ClientAccountService {

    private resourceUrl =  SERVER_API_URL + 'api/client-accounts';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(clientAccount: ClientAccount): Observable<EntityResponseType> {
        const copy = this.convert(clientAccount);
        return this.http.post<ClientAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(clientAccount: ClientAccount): Observable<EntityResponseType> {
        const copy = this.convert(clientAccount);
        return this.http.put<ClientAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ClientAccount>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ClientAccount[]>> {
        const options = createRequestOption(req);
        return this.http.get<ClientAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ClientAccount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ClientAccount = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ClientAccount[]>): HttpResponse<ClientAccount[]> {
        const jsonResponse: ClientAccount[] = res.body;
        const body: ClientAccount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ClientAccount.
     */
    private convertItemFromServer(clientAccount: ClientAccount): ClientAccount {
        const copy: ClientAccount = Object.assign({}, clientAccount);
        copy.lastLocalDateCheck = this.dateUtils
            .convertLocalDateFromServer(clientAccount.lastLocalDateCheck);
        return copy;
    }

    /**
     * Convert a ClientAccount to a JSON which can be sent to the server.
     */
    private convert(clientAccount: ClientAccount): ClientAccount {
        const copy: ClientAccount = Object.assign({}, clientAccount);
        copy.lastLocalDateCheck = this.dateUtils
            .convertLocalDateToServer(clientAccount.lastLocalDateCheck);
        return copy;
    }
}
