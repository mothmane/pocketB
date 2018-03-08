import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Credit } from './credit.model';
import { CreditService } from './credit.service';

@Injectable()
export class CreditPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private creditService: CreditService

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
                this.creditService.find(id)
                    .subscribe((creditResponse: HttpResponse<Credit>) => {
                        const credit: Credit = creditResponse.body;
                        if (credit.endingLocalDate) {
                            credit.endingLocalDate = {
                                year: credit.endingLocalDate.getFullYear(),
                                month: credit.endingLocalDate.getMonth() + 1,
                                day: credit.endingLocalDate.getDate()
                            };
                        }
                        this.ngbModalRef = this.creditModalRef(component, credit);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.creditModalRef(component, new Credit());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    creditModalRef(component: Component, credit: Credit): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.credit = credit;
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
