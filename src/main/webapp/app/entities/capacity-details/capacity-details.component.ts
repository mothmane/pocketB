import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CapacityDetails } from './capacity-details.model';
import { CapacityDetailsService } from './capacity-details.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-capacity-details',
    templateUrl: './capacity-details.component.html'
})
export class CapacityDetailsComponent implements OnInit, OnDestroy {
capacityDetails: CapacityDetails[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private capacityDetailsService: CapacityDetailsService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.capacityDetailsService.query().subscribe(
            (res: HttpResponse<CapacityDetails[]>) => {
                this.capacityDetails = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCapacityDetails();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CapacityDetails) {
        return item.id;
    }
    registerChangeInCapacityDetails() {
        this.eventSubscriber = this.eventManager.subscribe('capacityDetailsListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
