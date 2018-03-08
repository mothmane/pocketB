import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RetreatCapacity } from './retreat-capacity.model';
import { RetreatCapacityService } from './retreat-capacity.service';

@Injectable()
export class RetreatCapacityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private retreatCapacityService: RetreatCapacityService

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
                this.retreatCapacityService.find(id)
                    .subscribe((retreatCapacityResponse: HttpResponse<RetreatCapacity>) => {
                        const retreatCapacity: RetreatCapacity = retreatCapacityResponse.body;
                        this.ngbModalRef = this.retreatCapacityModalRef(component, retreatCapacity);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.retreatCapacityModalRef(component, new RetreatCapacity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    retreatCapacityModalRef(component: Component, retreatCapacity: RetreatCapacity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.retreatCapacity = retreatCapacity;
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
