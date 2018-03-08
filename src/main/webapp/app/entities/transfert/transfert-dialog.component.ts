import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Transfert } from './transfert.model';
import { TransfertPopupService } from './transfert-popup.service';
import { TransfertService } from './transfert.service';
import { ClientAccount, ClientAccountService } from '../client-account';
import { BeneficiaryAccount, BeneficiaryAccountService } from '../beneficiary-account';

@Component({
    selector: 'jhi-transfert-dialog',
    templateUrl: './transfert-dialog.component.html'
})
export class TransfertDialogComponent implements OnInit {

    transfert: Transfert;
    isSaving: boolean;

    transmitters: ClientAccount[];

    beneficiaries: BeneficiaryAccount[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private transfertService: TransfertService,
        private clientAccountService: ClientAccountService,
        private beneficiaryAccountService: BeneficiaryAccountService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientAccountService
            .query({filter: 'transfert-is-null'})
            .subscribe((res: HttpResponse<ClientAccount[]>) => {
                if (!this.transfert.transmitter || !this.transfert.transmitter.id) {
                    this.transmitters = res.body;
                } else {
                    this.clientAccountService
                        .find(this.transfert.transmitter.id)
                        .subscribe((subRes: HttpResponse<ClientAccount>) => {
                            this.transmitters = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.beneficiaryAccountService
            .query({filter: 'transfert-is-null'})
            .subscribe((res: HttpResponse<BeneficiaryAccount[]>) => {
                if (!this.transfert.beneficiary || !this.transfert.beneficiary.id) {
                    this.beneficiaries = res.body;
                } else {
                    this.beneficiaryAccountService
                        .find(this.transfert.beneficiary.id)
                        .subscribe((subRes: HttpResponse<BeneficiaryAccount>) => {
                            this.beneficiaries = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.transfert.id !== undefined) {
            this.subscribeToSaveResponse(
                this.transfertService.update(this.transfert));
        } else {
            this.subscribeToSaveResponse(
                this.transfertService.create(this.transfert));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Transfert>>) {
        result.subscribe((res: HttpResponse<Transfert>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Transfert) {
        this.eventManager.broadcast({ name: 'transfertListModification', content: 'OK'});
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

    trackBeneficiaryAccountById(index: number, item: BeneficiaryAccount) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-transfert-popup',
    template: ''
})
export class TransfertPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transfertPopupService: TransfertPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.transfertPopupService
                    .open(TransfertDialogComponent as Component, params['id']);
            } else {
                this.transfertPopupService
                    .open(TransfertDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
