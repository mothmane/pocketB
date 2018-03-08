import { BaseEntity } from './../../shared';

export const enum CreditType {
    'IMMEDIATE',
    'DIFFERED'
}

export class Credit implements BaseEntity {
    constructor(
        public id?: number,
        public capitalDue?: number,
        public dueAmount?: number,
        public duration?: number,
        public endingLocalDate?: any,
        public type?: CreditType,
        public customer?: BaseEntity,
    ) {
    }
}
