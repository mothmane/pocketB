import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CreditComponent } from './credit.component';
import { CreditDetailComponent } from './credit-detail.component';
import { CreditPopupComponent } from './credit-dialog.component';
import { CreditDeletePopupComponent } from './credit-delete-dialog.component';

export const creditRoute: Routes = [
    {
        path: 'credit',
        component: CreditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'credit/:id',
        component: CreditDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const creditPopupRoute: Routes = [
    {
        path: 'credit-new',
        component: CreditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'credit/:id/edit',
        component: CreditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'credit/:id/delete',
        component: CreditDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.credit.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
