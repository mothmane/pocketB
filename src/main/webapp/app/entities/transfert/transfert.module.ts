import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    TransfertService,
    TransfertPopupService,
    TransfertComponent,
    TransfertDetailComponent,
    TransfertDialogComponent,
    TransfertPopupComponent,
    TransfertDeletePopupComponent,
    TransfertDeleteDialogComponent,
    transfertRoute,
    transfertPopupRoute,
} from './';

const ENTITY_STATES = [
    ...transfertRoute,
    ...transfertPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TransfertComponent,
        TransfertDetailComponent,
        TransfertDialogComponent,
        TransfertDeleteDialogComponent,
        TransfertPopupComponent,
        TransfertDeletePopupComponent,
    ],
    entryComponents: [
        TransfertComponent,
        TransfertDialogComponent,
        TransfertPopupComponent,
        TransfertDeleteDialogComponent,
        TransfertDeletePopupComponent,
    ],
    providers: [
        TransfertService,
        TransfertPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBTransfertModule {}
