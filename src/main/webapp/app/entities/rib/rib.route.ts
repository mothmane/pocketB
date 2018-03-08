import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { RIBComponent } from './rib.component';
import { RIBDetailComponent } from './rib-detail.component';
import { RIBPopupComponent } from './rib-dialog.component';
import { RIBDeletePopupComponent } from './rib-delete-dialog.component';

export const rIBRoute: Routes = [
    {
        path: 'rib',
        component: RIBComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.rIB.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'rib/:id',
        component: RIBDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.rIB.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rIBPopupRoute: Routes = [
    {
        path: 'rib-new',
        component: RIBPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.rIB.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rib/:id/edit',
        component: RIBPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.rIB.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rib/:id/delete',
        component: RIBDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'pocketBApp.rIB.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
