import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RetreatCapacity } from './retreat-capacity.model';
import { RetreatCapacityService } from './retreat-capacity.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-retreat-capacity',
    templateUrl: './retreat-capacity.component.html'
})
export class RetreatCapacityComponent implements OnInit, OnDestroy {
retreatCapacities: RetreatCapacity[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private retreatCapacityService: RetreatCapacityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.retreatCapacityService.query().subscribe(
            (res: HttpResponse<RetreatCapacity[]>) => {
                this.retreatCapacities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRetreatCapacities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RetreatCapacity) {
        return item.id;
    }
    registerChangeInRetreatCapacities() {
        this.eventSubscriber = this.eventManager.subscribe('retreatCapacityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
