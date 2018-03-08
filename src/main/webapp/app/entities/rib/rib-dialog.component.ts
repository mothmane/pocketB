import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RIB } from './rib.model';
import { RIBPopupService } from './rib-popup.service';
import { RIBService } from './rib.service';
import { BankReference, BankReferenceService } from '../bank-reference';

@Component({
    selector: 'jhi-rib-dialog',
    templateUrl: './rib-dialog.component.html'
})
export class RIBDialogComponent implements OnInit {

    rIB: RIB;
    isSaving: boolean;

    bankreferences: BankReference[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private rIBService: RIBService,
        private bankReferenceService: BankReferenceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.bankReferenceService
            .query({filter: 'rib-is-null'})
            .subscribe((res: HttpResponse<BankReference[]>) => {
                if (!this.rIB.bankReference || !this.rIB.bankReference.id) {
                    this.bankreferences = res.body;
                } else {
                    this.bankReferenceService
                        .find(this.rIB.bankReference.id)
                        .subscribe((subRes: HttpResponse<BankReference>) => {
                            this.bankreferences = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.rIB.id !== undefined) {
            this.subscribeToSaveResponse(
                this.rIBService.update(this.rIB));
        } else {
            this.subscribeToSaveResponse(
                this.rIBService.create(this.rIB));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RIB>>) {
        result.subscribe((res: HttpResponse<RIB>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RIB) {
        this.eventManager.broadcast({ name: 'rIBListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBankReferenceById(index: number, item: BankReference) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-rib-popup',
    template: ''
})
export class RIBPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rIBPopupService: RIBPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.rIBPopupService
                    .open(RIBDialogComponent as Component, params['id']);
            } else {
                this.rIBPopupService
                    .open(RIBDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
