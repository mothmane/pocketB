import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    BankReferenceService,
    BankReferencePopupService,
    BankReferenceComponent,
    BankReferenceDetailComponent,
    BankReferenceDialogComponent,
    BankReferencePopupComponent,
    BankReferenceDeletePopupComponent,
    BankReferenceDeleteDialogComponent,
    bankReferenceRoute,
    bankReferencePopupRoute,
} from './';

const ENTITY_STATES = [
    ...bankReferenceRoute,
    ...bankReferencePopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BankReferenceComponent,
        BankReferenceDetailComponent,
        BankReferenceDialogComponent,
        BankReferenceDeleteDialogComponent,
        BankReferencePopupComponent,
        BankReferenceDeletePopupComponent,
    ],
    entryComponents: [
        BankReferenceComponent,
        BankReferenceDialogComponent,
        BankReferencePopupComponent,
        BankReferenceDeleteDialogComponent,
        BankReferenceDeletePopupComponent,
    ],
    providers: [
        BankReferenceService,
        BankReferencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBBankReferenceModule {}
