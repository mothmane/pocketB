import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RetreatCapacityComponent } from './retreat-capacity.component';
import { RetreatCapacityDetailComponent } from './retreat-capacity-detail.component';
import { RetreatCapacityPopupComponent } from './retreat-capacity-dialog.component';
import { RetreatCapacityDeletePopupComponent } from './retreat-capacity-delete-dialog.component';

export const retreatCapacityRoute: Routes = [
    {
        path: 'retreat-capacity',
        component: RetreatCapacityComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.retreatCapacity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'retreat-capacity/:id',
        component: RetreatCapacityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.retreatCapacity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const retreatCapacityPopupRoute: Routes = [
    {
        path: 'retreat-capacity-new',
        component: RetreatCapacityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.retreatCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'retreat-capacity/:id/edit',
        component: RetreatCapacityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.retreatCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'retreat-capacity/:id/delete',
        component: RetreatCapacityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.retreatCapacity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
