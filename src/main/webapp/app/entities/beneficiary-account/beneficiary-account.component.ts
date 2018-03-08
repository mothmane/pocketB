import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BeneficiaryAccount } from './beneficiary-account.model';
import { BeneficiaryAccountService } from './beneficiary-account.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-beneficiary-account',
    templateUrl: './beneficiary-account.component.html'
})
export class BeneficiaryAccountComponent implements OnInit, OnDestroy {
beneficiaryAccounts: BeneficiaryAccount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private beneficiaryAccountService: BeneficiaryAccountService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.beneficiaryAccountService.query().subscribe(
            (res: HttpResponse<BeneficiaryAccount[]>) => {
                this.beneficiaryAccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInBeneficiaryAccounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: BeneficiaryAccount) {
        return item.id;
    }
    registerChangeInBeneficiaryAccounts() {
        this.eventSubscriber = this.eventManager.subscribe('beneficiaryAccountListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
