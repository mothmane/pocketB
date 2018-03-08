import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    ClientAccountService,
    ClientAccountPopupService,
    ClientAccountComponent,
    ClientAccountDetailComponent,
    ClientAccountDialogComponent,
    ClientAccountPopupComponent,
    ClientAccountDeletePopupComponent,
    ClientAccountDeleteDialogComponent,
    clientAccountRoute,
    clientAccountPopupRoute,
} from './';

const ENTITY_STATES = [
    ...clientAccountRoute,
    ...clientAccountPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ClientAccountComponent,
        ClientAccountDetailComponent,
        ClientAccountDialogComponent,
        ClientAccountDeleteDialogComponent,
        ClientAccountPopupComponent,
        ClientAccountDeletePopupComponent,
    ],
    entryComponents: [
        ClientAccountComponent,
        ClientAccountDialogComponent,
        ClientAccountPopupComponent,
        ClientAccountDeleteDialogComponent,
        ClientAccountDeletePopupComponent,
    ],
    providers: [
        ClientAccountService,
        ClientAccountPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBClientAccountModule {}
