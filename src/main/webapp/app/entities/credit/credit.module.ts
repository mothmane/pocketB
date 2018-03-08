import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    CreditService,
    CreditPopupService,
    CreditComponent,
    CreditDetailComponent,
    CreditDialogComponent,
    CreditPopupComponent,
    CreditDeletePopupComponent,
    CreditDeleteDialogComponent,
    creditRoute,
    creditPopupRoute,
} from './';

const ENTITY_STATES = [
    ...creditRoute,
    ...creditPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CreditComponent,
        CreditDetailComponent,
        CreditDialogComponent,
        CreditDeleteDialogComponent,
        CreditPopupComponent,
        CreditDeletePopupComponent,
    ],
    entryComponents: [
        CreditComponent,
        CreditDialogComponent,
        CreditPopupComponent,
        CreditDeleteDialogComponent,
        CreditDeletePopupComponent,
    ],
    providers: [
        CreditService,
        CreditPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBCreditModule {}
