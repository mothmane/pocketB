import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RIB } from './rib.model';
import { RIBPopupService } from './rib-popup.service';
import { RIBService } from './rib.service';

@Component({
    selector: 'jhi-rib-delete-dialog',
    templateUrl: './rib-delete-dialog.component.html'
})
export class RIBDeleteDialogComponent {

    rIB: RIB;

    constructor(
        private rIBService: RIBService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.rIBService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'rIBListModification',
                content: 'Deleted an rIB'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-rib-delete-popup',
    template: ''
})
export class RIBDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private rIBPopupService: RIBPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.rIBPopupService
                .open(RIBDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
