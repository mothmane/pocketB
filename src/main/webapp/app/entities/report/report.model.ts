import { BaseEntity } from './../../shared';

export const enum ReportType {
    'STOLEN',
    'LOST'
}

export class Report implements BaseEntity {
    constructor(
        public id?: number,
        public message?: string,
        public type?: ReportType,
        public customer?: BaseEntity,
    ) {
    }
}
