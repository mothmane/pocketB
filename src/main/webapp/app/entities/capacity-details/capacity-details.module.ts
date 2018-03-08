import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    CapacityDetailsService,
    CapacityDetailsPopupService,
    CapacityDetailsComponent,
    CapacityDetailsDetailComponent,
    CapacityDetailsDialogComponent,
    CapacityDetailsPopupComponent,
    CapacityDetailsDeletePopupComponent,
    CapacityDetailsDeleteDialogComponent,
    capacityDetailsRoute,
    capacityDetailsPopupRoute,
} from './';

const ENTITY_STATES = [
    ...capacityDetailsRoute,
    ...capacityDetailsPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CapacityDetailsComponent,
        CapacityDetailsDetailComponent,
        CapacityDetailsDialogComponent,
        CapacityDetailsDeleteDialogComponent,
        CapacityDetailsPopupComponent,
        CapacityDetailsDeletePopupComponent,
    ],
    entryComponents: [
        CapacityDetailsComponent,
        CapacityDetailsDialogComponent,
        CapacityDetailsPopupComponent,
        CapacityDetailsDeleteDialogComponent,
        CapacityDetailsDeletePopupComponent,
    ],
    providers: [
        CapacityDetailsService,
        CapacityDetailsPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBCapacityDetailsModule {}
