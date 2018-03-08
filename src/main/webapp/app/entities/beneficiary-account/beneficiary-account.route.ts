import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BeneficiaryAccountComponent } from './beneficiary-account.component';
import { BeneficiaryAccountDetailComponent } from './beneficiary-account-detail.component';
import { BeneficiaryAccountPopupComponent } from './beneficiary-account-dialog.component';
import { BeneficiaryAccountDeletePopupComponent } from './beneficiary-account-delete-dialog.component';

export const beneficiaryAccountRoute: Routes = [
    {
        path: 'beneficiary-account',
        component: BeneficiaryAccountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.beneficiaryAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'beneficiary-account/:id',
        component: BeneficiaryAccountDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.beneficiaryAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const beneficiaryAccountPopupRoute: Routes = [
    {
        path: 'beneficiary-account-new',
        component: BeneficiaryAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.beneficiaryAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'beneficiary-account/:id/edit',
        component: BeneficiaryAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.beneficiaryAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'beneficiary-account/:id/delete',
        component: BeneficiaryAccountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.beneficiaryAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
