import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ClientAccount } from './client-account.model';
import { ClientAccountPopupService } from './client-account-popup.service';
import { ClientAccountService } from './client-account.service';
import { Customer, CustomerService } from '../customer';
import { RIB, RIBService } from '../rib';

@Component({
    selector: 'jhi-client-account-dialog',
    templateUrl: './client-account-dialog.component.html'
})
export class ClientAccountDialogComponent implements OnInit {

    clientAccount: ClientAccount;
    isSaving: boolean;

    customers: Customer[];

    ribs: RIB[];
    lastLocalDateCheckDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private clientAccountService: ClientAccountService,
        private customerService: CustomerService,
        private rIBService: RIBService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.rIBService
            .query({filter: 'clientaccount-is-null'})
            .subscribe((res: HttpResponse<RIB[]>) => {
                if (!this.clientAccount.rib || !this.clientAccount.rib.id) {
                    this.ribs = res.body;
                } else {
                    this.rIBService
                        .find(this.clientAccount.rib.id)
                        .subscribe((subRes: HttpResponse<RIB>) => {
                            this.ribs = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.clientAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.clientAccountService.update(this.clientAccount));
        } else {
            this.subscribeToSaveResponse(
                this.clientAccountService.create(this.clientAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ClientAccount>>) {
        result.subscribe((res: HttpResponse<ClientAccount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ClientAccount) {
        this.eventManager.broadcast({ name: 'clientAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }

    trackRIBById(index: number, item: RIB) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-client-account-popup',
    template: ''
})
export class ClientAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientAccountPopupService: ClientAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.clientAccountPopupService
                    .open(ClientAccountDialogComponent as Component, params['id']);
            } else {
                this.clientAccountPopupService
                    .open(ClientAccountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
