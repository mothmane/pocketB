import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ClientAccount } from './client-account.model';
import { ClientAccountService } from './client-account.service';

@Component({
    selector: 'jhi-client-account-detail',
    templateUrl: './client-account-detail.component.html'
})
export class ClientAccountDetailComponent implements OnInit, OnDestroy {

    clientAccount: ClientAccount;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private clientAccountService: ClientAccountService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInClientAccounts();
    }

    load(id) {
        this.clientAccountService.find(id)
            .subscribe((clientAccountResponse: HttpResponse<ClientAccount>) => {
                this.clientAccount = clientAccountResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInClientAccounts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'clientAccountListModification',
            (response) => this.load(this.clientAccount.id)
        );
    }
}
