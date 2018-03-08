import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RIB } from './rib.model';
import { RIBService } from './rib.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-rib',
    templateUrl: './rib.component.html'
})
export class RIBComponent implements OnInit, OnDestroy {
rIBS: RIB[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private rIBService: RIBService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.rIBService.query().subscribe(
            (res: HttpResponse<RIB[]>) => {
                this.rIBS = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRIBS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RIB) {
        return item.id;
    }
    registerChangeInRIBS() {
        this.eventSubscriber = this.eventManager.subscribe('rIBListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
