import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { CapacityDetailsComponent } from './capacity-details.component';
import { CapacityDetailsDetailComponent } from './capacity-details-detail.component';
import { CapacityDetailsPopupComponent } from './capacity-details-dialog.component';
import { CapacityDetailsDeletePopupComponent } from './capacity-details-delete-dialog.component';

export const capacityDetailsRoute: Routes = [
    {
        path: 'capacity-details',
        component: CapacityDetailsComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.capacityDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'capacity-details/:id',
        component: CapacityDetailsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.capacityDetails.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const capacityDetailsPopupRoute: Routes = [
    {
        path: 'capacity-details-new',
        component: CapacityDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.capacityDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'capacity-details/:id/edit',
        component: CapacityDetailsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.capacityDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'capacity-details/:id/delete',
        component: CapacityDetailsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.capacityDetails.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
