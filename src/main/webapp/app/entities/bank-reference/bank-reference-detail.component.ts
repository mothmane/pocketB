import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BankReference } from './bank-reference.model';
import { BankReferenceService } from './bank-reference.service';

@Component({
    selector: 'jhi-bank-reference-detail',
    templateUrl: './bank-reference-detail.component.html'
})
export class BankReferenceDetailComponent implements OnInit, OnDestroy {

    bankReference: BankReference;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private bankReferenceService: BankReferenceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInBankReferences();
    }

    load(id) {
        this.bankReferenceService.find(id)
            .subscribe((bankReferenceResponse: HttpResponse<BankReference>) => {
                this.bankReference = bankReferenceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBankReferences() {
        this.eventSubscriber = this.eventManager.subscribe(
            'bankReferenceListModification',
            (response) => this.load(this.bankReference.id)
        );
    }
}
