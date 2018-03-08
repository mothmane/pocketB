import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Transfert } from './transfert.model';
import { TransfertService } from './transfert.service';

@Injectable()
export class TransfertPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private transfertService: TransfertService

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
                this.transfertService.find(id)
                    .subscribe((transfertResponse: HttpResponse<Transfert>) => {
                        const transfert: Transfert = transfertResponse.body;
                        if (transfert.date) {
                            transfert.date = {
                                year: transfert.date.getFullYear(),
                                month: transfert.date.getMonth() + 1,
                                day: transfert.date.getDate()
                            };
                        }
                        this.ngbModalRef = this.transfertModalRef(component, transfert);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.transfertModalRef(component, new Transfert());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    transfertModalRef(component: Component, transfert: Transfert): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.transfert = transfert;
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
