import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BankReferenceComponent } from './bank-reference.component';
import { BankReferenceDetailComponent } from './bank-reference-detail.component';
import { BankReferencePopupComponent } from './bank-reference-dialog.component';
import { BankReferenceDeletePopupComponent } from './bank-reference-delete-dialog.component';

export const bankReferenceRoute: Routes = [
    {
        path: 'bank-reference',
        component: BankReferenceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.bankReference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bank-reference/:id',
        component: BankReferenceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.bankReference.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bankReferencePopupRoute: Routes = [
    {
        path: 'bank-reference-new',
        component: BankReferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.bankReference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-reference/:id/edit',
        component: BankReferencePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.bankReference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bank-reference/:id/delete',
        component: BankReferenceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.bankReference.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
