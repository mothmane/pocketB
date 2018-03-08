import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BankReference } from './bank-reference.model';
import { BankReferencePopupService } from './bank-reference-popup.service';
import { BankReferenceService } from './bank-reference.service';

@Component({
    selector: 'jhi-bank-reference-delete-dialog',
    templateUrl: './bank-reference-delete-dialog.component.html'
})
export class BankReferenceDeleteDialogComponent {

    bankReference: BankReference;

    constructor(
        private bankReferenceService: BankReferenceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.bankReferenceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'bankReferenceListModification',
                content: 'Deleted an bankReference'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-bank-reference-delete-popup',
    template: ''
})
export class BankReferenceDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private bankReferencePopupService: BankReferencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.bankReferencePopupService
                .open(BankReferenceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
