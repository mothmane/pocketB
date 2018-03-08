import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BeneficiaryAccount } from './beneficiary-account.model';
import { BeneficiaryAccountService } from './beneficiary-account.service';

@Injectable()
export class BeneficiaryAccountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private beneficiaryAccountService: BeneficiaryAccountService

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
                this.beneficiaryAccountService.find(id)
                    .subscribe((beneficiaryAccountResponse: HttpResponse<BeneficiaryAccount>) => {
                        const beneficiaryAccount: BeneficiaryAccount = beneficiaryAccountResponse.body;
                        this.ngbModalRef = this.beneficiaryAccountModalRef(component, beneficiaryAccount);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.beneficiaryAccountModalRef(component, new BeneficiaryAccount());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    beneficiaryAccountModalRef(component: Component, beneficiaryAccount: BeneficiaryAccount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.beneficiaryAccount = beneficiaryAccount;
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
