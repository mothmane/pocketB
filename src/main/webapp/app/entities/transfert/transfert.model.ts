import { BaseEntity } from './../../shared';

export const enum TransfertType {
    'PUNCTUAL',
    'PERMANENT'
}

export class Transfert implements BaseEntity {
    constructor(
        public id?: number,
        public amount?: number,
        public date?: any,
        public motif?: string,
        public description?: string,
        public type?: TransfertType,
        public transmitter?: BaseEntity,
        public beneficiary?: BaseEntity,
    ) {
    }
}
