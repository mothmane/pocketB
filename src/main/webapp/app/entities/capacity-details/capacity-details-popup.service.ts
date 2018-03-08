import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { CapacityDetails } from './capacity-details.model';
import { CapacityDetailsService } from './capacity-details.service';

@Injectable()
export class CapacityDetailsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private capacityDetailsService: CapacityDetailsService

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
                this.capacityDetailsService.find(id)
                    .subscribe((capacityDetailsResponse: HttpResponse<CapacityDetails>) => {
                        const capacityDetails: CapacityDetails = capacityDetailsResponse.body;
                        this.ngbModalRef = this.capacityDetailsModalRef(component, capacityDetails);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.capacityDetailsModalRef(component, new CapacityDetails());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    capacityDetailsModalRef(component: Component, capacityDetails: CapacityDetails): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.capacityDetails = capacityDetails;
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
