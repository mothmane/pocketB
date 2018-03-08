import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RetreatCapacity } from './retreat-capacity.model';
import { RetreatCapacityPopupService } from './retreat-capacity-popup.service';
import { RetreatCapacityService } from './retreat-capacity.service';

@Component({
    selector: 'jhi-retreat-capacity-dialog',
    templateUrl: './retreat-capacity-dialog.component.html'
})
export class RetreatCapacityDialogComponent implements OnInit {

    retreatCapacity: RetreatCapacity;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private retreatCapacityService: RetreatCapacityService,
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
        if (this.retreatCapacity.id !== undefined) {
            this.subscribeToSaveResponse(
                this.retreatCapacityService.update(this.retreatCapacity));
        } else {
            this.subscribeToSaveResponse(
                this.retreatCapacityService.create(this.retreatCapacity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RetreatCapacity>>) {
        result.subscribe((res: HttpResponse<RetreatCapacity>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RetreatCapacity) {
        this.eventManager.broadcast({ name: 'retreatCapacityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-retreat-capacity-popup',
    template: ''
})
export class RetreatCapacityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private retreatCapacityPopupService: RetreatCapacityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.retreatCapacityPopupService
                    .open(RetreatCapacityDialogComponent as Component, params['id']);
            } else {
                this.retreatCapacityPopupService
                    .open(RetreatCapacityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
