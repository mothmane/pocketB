import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    RetreatCapacityService,
    RetreatCapacityPopupService,
    RetreatCapacityComponent,
    RetreatCapacityDetailComponent,
    RetreatCapacityDialogComponent,
    RetreatCapacityPopupComponent,
    RetreatCapacityDeletePopupComponent,
    RetreatCapacityDeleteDialogComponent,
    retreatCapacityRoute,
    retreatCapacityPopupRoute,
} from './';

const ENTITY_STATES = [
    ...retreatCapacityRoute,
    ...retreatCapacityPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RetreatCapacityComponent,
        RetreatCapacityDetailComponent,
        RetreatCapacityDialogComponent,
        RetreatCapacityDeleteDialogComponent,
        RetreatCapacityPopupComponent,
        RetreatCapacityDeletePopupComponent,
    ],
    entryComponents: [
        RetreatCapacityComponent,
        RetreatCapacityDialogComponent,
        RetreatCapacityPopupComponent,
        RetreatCapacityDeleteDialogComponent,
        RetreatCapacityDeletePopupComponent,
    ],
    providers: [
        RetreatCapacityService,
        RetreatCapacityPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBRetreatCapacityModule {}
