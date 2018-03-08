import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Notification } from './notification.model';
import { NotificationService } from './notification.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-notification',
    templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit, OnDestroy {
notifications: Notification[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private notificationService: NotificationService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.notificationService.query().subscribe(
            (res: HttpResponse<Notification[]>) => {
                this.notifications = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNotifications();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Notification) {
        return item.id;
    }
    registerChangeInNotifications() {
        this.eventSubscriber = this.eventManager.subscribe('notificationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
