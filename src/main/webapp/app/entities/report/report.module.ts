import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PocketBSharedModule } from '../../shared';
import {
    ReportService,
    ReportPopupService,
    ReportComponent,
    ReportDetailComponent,
    ReportDialogComponent,
    ReportPopupComponent,
    ReportDeletePopupComponent,
    ReportDeleteDialogComponent,
    reportRoute,
    reportPopupRoute,
} from './';

const ENTITY_STATES = [
    ...reportRoute,
    ...reportPopupRoute,
];

@NgModule({
    imports: [
        PocketBSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ReportComponent,
        ReportDetailComponent,
        ReportDialogComponent,
        ReportDeleteDialogComponent,
        ReportPopupComponent,
        ReportDeletePopupComponent,
    ],
    entryComponents: [
        ReportComponent,
        ReportDialogComponent,
        ReportPopupComponent,
        ReportDeleteDialogComponent,
        ReportDeletePopupComponent,
    ],
    providers: [
        ReportService,
        ReportPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PocketBReportModule {}
