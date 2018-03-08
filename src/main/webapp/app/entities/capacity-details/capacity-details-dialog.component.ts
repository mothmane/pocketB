import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CapacityDetails } from './capacity-details.model';
import { CapacityDetailsPopupService } from './capacity-details-popup.service';
import { CapacityDetailsService } from './capacity-details.service';
import { RetreatCapacity, RetreatCapacityService } from '../retreat-capacity';

@Component({
    selector: 'jhi-capacity-details-dialog',
    templateUrl: './capacity-details-dialog.component.html'
})
export class CapacityDetailsDialogComponent implements OnInit {

    capacityDetails: CapacityDetails;
    isSaving: boolean;

    retreatcapacities: RetreatCapacity[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private capacityDetailsService: CapacityDetailsService,
        private retreatCapacityService: RetreatCapacityService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.retreatCapacityService.query()
            .subscribe((res: HttpResponse<RetreatCapacity[]>) => { this.retreatcapacities = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.capacityDetails.id !== undefined) {
            this.subscribeToSaveResponse(
                this.capacityDetailsService.update(this.capacityDetails));
        } else {
            this.subscribeToSaveResponse(
                this.capacityDetailsService.create(this.capacityDetails));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CapacityDetails>>) {
        result.subscribe((res: HttpResponse<CapacityDetails>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CapacityDetails) {
        this.eventManager.broadcast({ name: 'capacityDetailsListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackRetreatCapacityById(index: number, item: RetreatCapacity) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-capacity-details-popup',
    template: ''
})
export class CapacityDetailsPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private capacityDetailsPopupService: CapacityDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.capacityDetailsPopupService
                    .open(CapacityDetailsDialogComponent as Component, params['id']);
            } else {
                this.capacityDetailsPopupService
                    .open(CapacityDetailsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
