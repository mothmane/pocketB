import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CapacityDetails } from './capacity-details.model';
import { CapacityDetailsPopupService } from './capacity-details-popup.service';
import { CapacityDetailsService } from './capacity-details.service';

@Component({
    selector: 'jhi-capacity-details-delete-dialog',
    templateUrl: './capacity-details-delete-dialog.component.html'
})
export class CapacityDetailsDeleteDialogComponent {

    capacityDetails: CapacityDetails;

    constructor(
        private capacityDetailsService: CapacityDetailsService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.capacityDetailsService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'capacityDetailsListModification',
                content: 'Deleted an capacityDetails'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-capacity-details-delete-popup',
    template: ''
})
export class CapacityDetailsDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private capacityDetailsPopupService: CapacityDetailsPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.capacityDetailsPopupService
                .open(CapacityDetailsDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
