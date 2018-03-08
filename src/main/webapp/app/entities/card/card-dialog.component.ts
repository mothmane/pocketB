import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Card } from './card.model';
import { CardPopupService } from './card-popup.service';
import { CardService } from './card.service';
import { ClientAccount, ClientAccountService } from '../client-account';
import { RetreatCapacity, RetreatCapacityService } from '../retreat-capacity';

@Component({
    selector: 'jhi-card-dialog',
    templateUrl: './card-dialog.component.html'
})
export class CardDialogComponent implements OnInit {

    card: Card;
    isSaving: boolean;

    accountdebiteds: ClientAccount[];

    retreatcapacities: RetreatCapacity[];
    expiryLocalDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cardService: CardService,
        private clientAccountService: ClientAccountService,
        private retreatCapacityService: RetreatCapacityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.clientAccountService
            .query({filter: 'card-is-null'})
            .subscribe((res: HttpResponse<ClientAccount[]>) => {
                if (!this.card.accountDebited || !this.card.accountDebited.id) {
                    this.accountdebiteds = res.body;
                } else {
                    this.clientAccountService
                        .find(this.card.accountDebited.id)
                        .subscribe((subRes: HttpResponse<ClientAccount>) => {
                            this.accountdebiteds = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.retreatCapacityService
            .query({filter: 'card-is-null'})
            .subscribe((res: HttpResponse<RetreatCapacity[]>) => {
                if (!this.card.retreatCapacity || !this.card.retreatCapacity.id) {
                    this.retreatcapacities = res.body;
                } else {
                    this.retreatCapacityService
                        .find(this.card.retreatCapacity.id)
                        .subscribe((subRes: HttpResponse<RetreatCapacity>) => {
                            this.retreatcapacities = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.card.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cardService.update(this.card));
        } else {
            this.subscribeToSaveResponse(
                this.cardService.create(this.card));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Card>>) {
        result.subscribe((res: HttpResponse<Card>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Card) {
        this.eventManager.broadcast({ name: 'cardListModification', content: 'OK'});
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

    trackRetreatCapacityById(index: number, item: RetreatCapacity) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-card-popup',
    template: ''
})
export class CardPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cardPopupService: CardPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cardPopupService
                    .open(CardDialogComponent as Component, params['id']);
            } else {
                this.cardPopupService
                    .open(CardDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
