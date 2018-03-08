import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CapacityDetails } from './capacity-details.model';
import { CapacityDetailsService } from './capacity-details.service';

@Component({
    selector: 'jhi-capacity-details-detail',
    templateUrl: './capacity-details-detail.component.html'
})
export class CapacityDetailsDetailComponent implements OnInit, OnDestroy {

    capacityDetails: CapacityDetails;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private capacityDetailsService: CapacityDetailsService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCapacityDetails();
    }

    load(id) {
        this.capacityDetailsService.find(id)
            .subscribe((capacityDetailsResponse: HttpResponse<CapacityDetails>) => {
                this.capacityDetails = capacityDetailsResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCapacityDetails() {
        this.eventSubscriber = this.eventManager.subscribe(
            'capacityDetailsListModification',
            (response) => this.load(this.capacityDetails.id)
        );
    }
}
