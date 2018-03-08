import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TransfertComponent } from './transfert.component';
import { TransfertDetailComponent } from './transfert-detail.component';
import { TransfertPopupComponent } from './transfert-dialog.component';
import { TransfertDeletePopupComponent } from './transfert-delete-dialog.component';

export const transfertRoute: Routes = [
    {
        path: 'transfert',
        component: TransfertComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.transfert.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'transfert/:id',
        component: TransfertDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.transfert.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const transfertPopupRoute: Routes = [
    {
        path: 'transfert-new',
        component: TransfertPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.transfert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transfert/:id/edit',
        component: TransfertPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.transfert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'transfert/:id/delete',
        component: TransfertDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.transfert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
