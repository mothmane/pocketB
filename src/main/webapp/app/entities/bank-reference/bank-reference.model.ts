import { BaseEntity } from './../../shared';

export class BankReference implements BaseEntity {
    constructor(
        public id?: number,
        public bankCode?: string,
        public boxCode?: string,
        public accountNumber?: string,
        public ribKey?: string,
    ) {
    }
}
