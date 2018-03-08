import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Credit } from './credit.model';
import { CreditPopupService } from './credit-popup.service';
import { CreditService } from './credit.service';
import { Customer, CustomerService } from '../customer';

@Component({
    selector: 'jhi-credit-dialog',
    templateUrl: './credit-dialog.component.html'
})
export class CreditDialogComponent implements OnInit {

    credit: Credit;
    isSaving: boolean;

    customers: Customer[];
    endingLocalDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private creditService: CreditService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.credit.id !== undefined) {
            this.subscribeToSaveResponse(
                this.creditService.update(this.credit));
        } else {
            this.subscribeToSaveResponse(
                this.creditService.create(this.credit));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Credit>>) {
        result.subscribe((res: HttpResponse<Credit>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Credit) {
        this.eventManager.broadcast({ name: 'creditListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-credit-popup',
    template: ''
})
export class CreditPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private creditPopupService: CreditPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.creditPopupService
                    .open(CreditDialogComponent as Component, params['id']);
            } else {
                this.creditPopupService
                    .open(CreditDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
