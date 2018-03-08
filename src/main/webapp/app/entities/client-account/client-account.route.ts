import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { ClientAccountComponent } from './client-account.component';
import { ClientAccountDetailComponent } from './client-account-detail.component';
import { ClientAccountPopupComponent } from './client-account-dialog.component';
import { ClientAccountDeletePopupComponent } from './client-account-delete-dialog.component';

export const clientAccountRoute: Routes = [
    {
        path: 'client-account',
        component: ClientAccountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.clientAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'client-account/:id',
        component: ClientAccountDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.clientAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const clientAccountPopupRoute: Routes = [
    {
        path: 'client-account-new',
        component: ClientAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.clientAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-account/:id/edit',
        component: ClientAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.clientAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'client-account/:id/delete',
        component: ClientAccountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.clientAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
