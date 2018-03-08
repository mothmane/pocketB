import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PocketBCustomerModule } from './customer/customer.module';
import { PocketBClientAccountModule } from './client-account/client-account.module';
import { PocketBRIBModule } from './rib/rib.module';
import { PocketBBankReferenceModule } from './bank-reference/bank-reference.module';
import { PocketBCardModule } from './card/card.module';
import { PocketBOperationModule } from './operation/operation.module';
import { PocketBRetreatCapacityModule } from './retreat-capacity/retreat-capacity.module';
import { PocketBCapacityDetailsModule } from './capacity-details/capacity-details.module';
import { PocketBTransfertModule } from './transfert/transfert.module';
import { PocketBBeneficiaryAccountModule } from './beneficiary-account/beneficiary-account.module';
import { PocketBCreditModule } from './credit/credit.module';
import { PocketBReportModule } from './report/report.module';
import { PocketBNotificationModule } from './notification/notification.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PocketBCustomerModule,
        PocketBClientAccountModule,
        PocketBRIBModule,
        PocketBBankReferenceModule,
        PocketBCardModule,
        PocketBOperationModule,
        PocketBRetreatCapacityModule,
        PocketBCapacityDetailsModule,
        PocketBTransfertModule,
        PocketBBeneficiaryAccountModule,
        PocketBCreditModule,
        PocketBReportModule,
        PocketBNotificationModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBEntityModule {}
