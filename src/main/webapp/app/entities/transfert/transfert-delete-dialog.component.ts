import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Transfert } from './transfert.model';
import { TransfertPopupService } from './transfert-popup.service';
import { TransfertService } from './transfert.service';

@Component({
    selector: 'jhi-transfert-delete-dialog',
    templateUrl: './transfert-delete-dialog.component.html'
})
export class TransfertDeleteDialogComponent {

    transfert: Transfert;

    constructor(
        private transfertService: TransfertService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.transfertService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'transfertListModification',
                content: 'Deleted an transfert'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-transfert-delete-popup',
    template: ''
})
export class TransfertDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private transfertPopupService: TransfertPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.transfertPopupService
                .open(TransfertDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
