import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ClientAccount } from './client-account.model';
import { ClientAccountPopupService } from './client-account-popup.service';
import { ClientAccountService } from './client-account.service';

@Component({
    selector: 'jhi-client-account-delete-dialog',
    templateUrl: './client-account-delete-dialog.component.html'
})
export class ClientAccountDeleteDialogComponent {

    clientAccount: ClientAccount;

    constructor(
        private clientAccountService: ClientAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.clientAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'clientAccountListModification',
                content: 'Deleted an clientAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-client-account-delete-popup',
    template: ''
})
export class ClientAccountDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private clientAccountPopupService: ClientAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.clientAccountPopupService
                .open(ClientAccountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
