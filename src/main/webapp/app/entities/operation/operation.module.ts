import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    OperationService,
    OperationPopupService,
    OperationComponent,
    OperationDetailComponent,
    OperationDialogComponent,
    OperationPopupComponent,
    OperationDeletePopupComponent,
    OperationDeleteDialogComponent,
    operationRoute,
    operationPopupRoute,
} from './';

const ENTITY_STATES = [
    ...operationRoute,
    ...operationPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        OperationComponent,
        OperationDetailComponent,
        OperationDialogComponent,
        OperationDeleteDialogComponent,
        OperationPopupComponent,
        OperationDeletePopupComponent,
    ],
    entryComponents: [
        OperationComponent,
        OperationDialogComponent,
        OperationPopupComponent,
        OperationDeleteDialogComponent,
        OperationDeletePopupComponent,
    ],
    providers: [
        OperationService,
        OperationPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBOperationModule {}
