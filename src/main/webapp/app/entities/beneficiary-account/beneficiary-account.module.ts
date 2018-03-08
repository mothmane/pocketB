import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    BeneficiaryAccountService,
    BeneficiaryAccountPopupService,
    BeneficiaryAccountComponent,
    BeneficiaryAccountDetailComponent,
    BeneficiaryAccountDialogComponent,
    BeneficiaryAccountPopupComponent,
    BeneficiaryAccountDeletePopupComponent,
    BeneficiaryAccountDeleteDialogComponent,
    beneficiaryAccountRoute,
    beneficiaryAccountPopupRoute,
} from './';

const ENTITY_STATES = [
    ...beneficiaryAccountRoute,
    ...beneficiaryAccountPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BeneficiaryAccountComponent,
        BeneficiaryAccountDetailComponent,
        BeneficiaryAccountDialogComponent,
        BeneficiaryAccountDeleteDialogComponent,
        BeneficiaryAccountPopupComponent,
        BeneficiaryAccountDeletePopupComponent,
    ],
    entryComponents: [
        BeneficiaryAccountComponent,
        BeneficiaryAccountDialogComponent,
        BeneficiaryAccountPopupComponent,
        BeneficiaryAccountDeleteDialogComponent,
        BeneficiaryAccountDeletePopupComponent,
    ],
    providers: [
        BeneficiaryAccountService,
        BeneficiaryAccountPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBBeneficiaryAccountModule {}
