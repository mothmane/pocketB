import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ClientAccount } from './client-account.model';
import { ClientAccountService } from './client-account.service';

@Injectable()
export class ClientAccountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private clientAccountService: ClientAccountService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.clientAccountService.find(id)
                    .subscribe((clientAccountResponse: HttpResponse<ClientAccount>) => {
                        const clientAccount: ClientAccount = clientAccountResponse.body;
                        if (clientAccount.lastLocalDateCheck) {
                            clientAccount.lastLocalDateCheck = {
                                year: clientAccount.lastLocalDateCheck.getFullYear(),
                                month: clientAccount.lastLocalDateCheck.getMonth() + 1,
                                day: clientAccount.lastLocalDateCheck.getDate()
                            };
                        }
                        this.ngbModalRef = this.clientAccountModalRef(component, clientAccount);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.clientAccountModalRef(component, new ClientAccount());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    clientAccountModalRef(component: Component, clientAccount: ClientAccount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.clientAccount = clientAccount;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
