import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Transfert } from './transfert.model';
import { TransfertService } from './transfert.service';

@Component({
    selector: 'jhi-transfert-detail',
    templateUrl: './transfert-detail.component.html'
})
export class TransfertDetailComponent implements OnInit, OnDestroy {

    transfert: Transfert;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private transfertService: TransfertService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTransferts();
    }

    load(id) {
        this.transfertService.find(id)
            .subscribe((transfertResponse: HttpResponse<Transfert>) => {
                this.transfert = transfertResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTransferts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'transfertListModification',
            (response) => this.load(this.transfert.id)
        );
    }
}
