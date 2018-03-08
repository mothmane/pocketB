import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Credit } from './credit.model';
import { CreditService } from './credit.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-credit',
    templateUrl: './credit.component.html'
})
export class CreditComponent implements OnInit, OnDestroy {
credits: Credit[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private creditService: CreditService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.creditService.query().subscribe(
            (res: HttpResponse<Credit[]>) => {
                this.credits = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCredits();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Credit) {
        return item.id;
    }
    registerChangeInCredits() {
        this.eventSubscriber = this.eventManager.subscribe('creditListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
