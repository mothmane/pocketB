import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BeneficiaryAccount } from './beneficiary-account.model';
import { BeneficiaryAccountService } from './beneficiary-account.service';

@Component({
    selector: 'jhi-beneficiary-account-detail',
    templateUrl: './beneficiary-account-detail.component.html'
})
export class BeneficiaryAccountDetailComponent implements OnInit, OnDestroy {

    beneficiaryAccount: BeneficiaryAccount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private beneficiaryAccountService: BeneficiaryAccountService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBeneficiaryAccounts();
    }

    load(id) {
        this.beneficiaryAccountService.find(id)
            .subscribe((beneficiaryAccountResponse: HttpResponse<BeneficiaryAccount>) => {
                this.beneficiaryAccount = beneficiaryAccountResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBeneficiaryAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'beneficiaryAccountListModification',
            (response) => this.load(this.beneficiaryAccount.id)
        );
    }
}
