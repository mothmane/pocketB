import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BeneficiaryAccount } from './beneficiary-account.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BeneficiaryAccount>;

@Injectable()
export class BeneficiaryAccountService {

    private resourceUrl =  SERVER_API_URL + 'api/beneficiary-accounts';

    constructor(private http: HttpClient) { }

    create(beneficiaryAccount: BeneficiaryAccount): Observable<EntityResponseType> {
        const copy = this.convert(beneficiaryAccount);
        return this.http.post<BeneficiaryAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(beneficiaryAccount: BeneficiaryAccount): Observable<EntityResponseType> {
        const copy = this.convert(beneficiaryAccount);
        return this.http.put<BeneficiaryAccount>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BeneficiaryAccount>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BeneficiaryAccount[]>> {
        const options = createRequestOption(req);
        return this.http.get<BeneficiaryAccount[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BeneficiaryAccount[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BeneficiaryAccount = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BeneficiaryAccount[]>): HttpResponse<BeneficiaryAccount[]> {
        const jsonResponse: BeneficiaryAccount[] = res.body;
        const body: BeneficiaryAccount[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BeneficiaryAccount.
     */
    private convertItemFromServer(beneficiaryAccount: BeneficiaryAccount): BeneficiaryAccount {
        const copy: BeneficiaryAccount = Object.assign({}, beneficiaryAccount);
        return copy;
    }

    /**
     * Convert a BeneficiaryAccount to a JSON which can be sent to the server.
     */
    private convert(beneficiaryAccount: BeneficiaryAccount): BeneficiaryAccount {
        const copy: BeneficiaryAccount = Object.assign({}, beneficiaryAccount);
        return copy;
    }
}
