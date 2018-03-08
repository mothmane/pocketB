import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RetreatCapacity } from './retreat-capacity.model';
import { RetreatCapacityService } from './retreat-capacity.service';

@Component({
    selector: 'jhi-retreat-capacity-detail',
    templateUrl: './retreat-capacity-detail.component.html'
})
export class RetreatCapacityDetailComponent implements OnInit, OnDestroy {

    retreatCapacity: RetreatCapacity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private retreatCapacityService: RetreatCapacityService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRetreatCapacities();
    }

    load(id) {
        this.retreatCapacityService.find(id)
            .subscribe((retreatCapacityResponse: HttpResponse<RetreatCapacity>) => {
                this.retreatCapacity = retreatCapacityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRetreatCapacities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'retreatCapacityListModification',
            (response) => this.load(this.retreatCapacity.id)
        );
    }
}
