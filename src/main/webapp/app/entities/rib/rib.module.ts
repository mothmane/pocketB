import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    RIBService,
    RIBPopupService,
    RIBComponent,
    RIBDetailComponent,
    RIBDialogComponent,
    RIBPopupComponent,
    RIBDeletePopupComponent,
    RIBDeleteDialogComponent,
    rIBRoute,
    rIBPopupRoute,
} from './';

const ENTITY_STATES = [
    ...rIBRoute,
    ...rIBPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        RIBComponent,
        RIBDetailComponent,
        RIBDialogComponent,
        RIBDeleteDialogComponent,
        RIBPopupComponent,
        RIBDeletePopupComponent,
    ],
    entryComponents: [
        RIBComponent,
        RIBDialogComponent,
        RIBPopupComponent,
        RIBDeleteDialogComponent,
        RIBDeletePopupComponent,
    ],
    providers: [
        RIBService,
        RIBPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBRIBModule {}
