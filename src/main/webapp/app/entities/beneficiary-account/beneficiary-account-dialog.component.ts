import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BeneficiaryAccount } from './beneficiary-account.model';
import { BeneficiaryAccountPopupService } from './beneficiary-account-popup.service';
import { BeneficiaryAccountService } from './beneficiary-account.service';
import { ClientAccount, ClientAccountService } from '../client-account';

@Component({
    selector: 'jhi-beneficiary-account-dialog',
    templateUrl: './beneficiary-account-dialog.component.html'
})
export class BeneficiaryAccountDialogComponent implements OnInit {

    beneficiaryAccount: BeneficiaryAccount;
    isSaving: boolean;

    clientaccounts: ClientAccount[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private beneficiaryAccountService: BeneficiaryAccountService,
        private clientAccountService: ClientAccountService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientAccountService.query()
            .subscribe((res: HttpResponse<ClientAccount[]>) => { this.clientaccounts = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.beneficiaryAccount.id !== undefined) {
            this.subscribeToSaveResponse(
                this.beneficiaryAccountService.update(this.beneficiaryAccount));
        } else {
            this.subscribeToSaveResponse(
                this.beneficiaryAccountService.create(this.beneficiaryAccount));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BeneficiaryAccount>>) {
        result.subscribe((res: HttpResponse<BeneficiaryAccount>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BeneficiaryAccount) {
        this.eventManager.broadcast({ name: 'beneficiaryAccountListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackClientAccountById(index: number, item: ClientAccount) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-beneficiary-account-popup',
    template: ''
})
export class BeneficiaryAccountPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private beneficiaryAccountPopupService: BeneficiaryAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.beneficiaryAccountPopupService
                    .open(BeneficiaryAccountDialogComponent as Component, params['id']);
            } else {
                this.beneficiaryAccountPopupService
                    .open(BeneficiaryAccountDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
