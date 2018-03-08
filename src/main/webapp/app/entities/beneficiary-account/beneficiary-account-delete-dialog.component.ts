import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BeneficiaryAccount } from './beneficiary-account.model';
import { BeneficiaryAccountPopupService } from './beneficiary-account-popup.service';
import { BeneficiaryAccountService } from './beneficiary-account.service';

@Component({
    selector: 'jhi-beneficiary-account-delete-dialog',
    templateUrl: './beneficiary-account-delete-dialog.component.html'
})
export class BeneficiaryAccountDeleteDialogComponent {

    beneficiaryAccount: BeneficiaryAccount;

    constructor(
        private beneficiaryAccountService: BeneficiaryAccountService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.beneficiaryAccountService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'beneficiaryAccountListModification',
                content: 'Deleted an beneficiaryAccount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-beneficiary-account-delete-popup',
    template: ''
})
export class BeneficiaryAccountDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private beneficiaryAccountPopupService: BeneficiaryAccountPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.beneficiaryAccountPopupService
                .open(BeneficiaryAccountDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
