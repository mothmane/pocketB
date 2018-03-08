import { BaseEntity } from './../../shared';

export const enum AccountType {
    'CHECKING',
    'SAVINGS',
    'CD',
    'MONEY_MARKET',
    'IRAS'
}

export class ClientAccount implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public solde?: number,
        public lastLocalDateCheck?: any,
        public type?: AccountType,
        public customer?: BaseEntity,
        public rib?: BaseEntity,
    ) {
    }
}
