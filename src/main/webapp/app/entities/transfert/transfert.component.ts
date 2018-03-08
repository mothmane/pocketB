import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Transfert } from './transfert.model';
import { TransfertService } from './transfert.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-transfert',
    templateUrl: './transfert.component.html'
})
export class TransfertComponent implements OnInit, OnDestroy {
transferts: Transfert[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private transfertService: TransfertService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.transfertService.query().subscribe(
            (res: HttpResponse<Transfert[]>) => {
                this.transferts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTransferts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Transfert) {
        return item.id;
    }
    registerChangeInTransferts() {
        this.eventSubscriber = this.eventManager.subscribe('transfertListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
