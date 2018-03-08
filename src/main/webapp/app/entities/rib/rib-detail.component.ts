import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RIB } from './rib.model';
import { RIBService } from './rib.service';

@Component({
    selector: 'jhi-rib-detail',
    templateUrl: './rib-detail.component.html'
})
export class RIBDetailComponent implements OnInit, OnDestroy {

    rIB: RIB;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rIBService: RIBService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRIBS();
    }

    load(id) {
        this.rIBService.find(id)
            .subscribe((rIBResponse: HttpResponse<RIB>) => {
                this.rIB = rIBResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRIBS() {
        this.eventSubscriber = this.eventManager.subscribe(
            'rIBListModification',
            (response) => this.load(this.rIB.id)
        );
    }
}
