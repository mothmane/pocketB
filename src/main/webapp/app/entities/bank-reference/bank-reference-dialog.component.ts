import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankReference } from './bank-reference.model';
import { BankReferencePopupService } from './bank-reference-popup.service';
import { BankReferenceService } from './bank-reference.service';

@Component({
    selector: 'jhi-bank-reference-dialog',
    templateUrl: './bank-reference-dialog.component.html'
})
export class BankReferenceDialogComponent implements OnInit {

    bankReference: BankReference;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private bankReferenceService: BankReferenceService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.bankReference.id !== undefined) {
            this.subscribeToSaveResponse(
                this.bankReferenceService.update(this.bankReference));
        } else {
            this.subscribeToSaveResponse(
                this.bankReferenceService.create(this.bankReference));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BankReference>>) {
        result.subscribe((res: HttpResponse<BankReference>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BankReference) {
        this.eventManager.broadcast({ name: 'bankReferenceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-bank-reference-popup',
    template: ''
})
export class BankReferencePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankReferencePopupService: BankReferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.bankReferencePopupService
                    .open(BankReferenceDialogComponent as Component, params['id']);
            } else {
                this.bankReferencePopupService
                    .open(BankReferenceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
