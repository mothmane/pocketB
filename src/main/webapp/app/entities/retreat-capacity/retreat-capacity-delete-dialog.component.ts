import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RetreatCapacity } from './retreat-capacity.model';
import { RetreatCapacityPopupService } from './retreat-capacity-popup.service';
import { RetreatCapacityService } from './retreat-capacity.service';

@Component({
    selector: 'jhi-retreat-capacity-delete-dialog',
    templateUrl: './retreat-capacity-delete-dialog.component.html'
})
export class RetreatCapacityDeleteDialogComponent {

    retreatCapacity: RetreatCapacity;

    constructor(
        private retreatCapacityService: RetreatCapacityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.retreatCapacityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'retreatCapacityListModification',
                content: 'Deleted an retreatCapacity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-retreat-capacity-delete-popup',
    template: ''
})
export class RetreatCapacityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private retreatCapacityPopupService: RetreatCapacityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.retreatCapacityPopupService
                .open(RetreatCapacityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
