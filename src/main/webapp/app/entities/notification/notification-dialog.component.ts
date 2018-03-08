import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Notification } from './notification.model';
import { NotificationPopupService } from './notification-popup.service';
import { NotificationService } from './notification.service';
import { Customer, CustomerService } from '../customer';

@Component({
    selector: 'jhi-notification-dialog',
    templateUrl: './notification-dialog.component.html'
})
export class NotificationDialogComponent implements OnInit {

    notification: Notification;
    isSaving: boolean;

    customers: Customer[];
    dateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private notificationService: NotificationService,
        private customerService: CustomerService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.customerService.query()
            .subscribe((res: HttpResponse<Customer[]>) => { this.customers = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.notification.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notificationService.update(this.notification));
        } else {
            this.subscribeToSaveResponse(
                this.notificationService.create(this.notification));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Notification>>) {
        result.subscribe((res: HttpResponse<Notification>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Notification) {
        this.eventManager.broadcast({ name: 'notificationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCustomerById(index: number, item: Customer) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-notification-popup',
    template: ''
})
export class NotificationPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notificationPopupService: NotificationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notificationPopupService
                    .open(NotificationDialogComponent as Component, params['id']);
            } else {
                this.notificationPopupService
                    .open(NotificationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
