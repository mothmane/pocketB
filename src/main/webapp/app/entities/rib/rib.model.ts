import { BaseEntity } from './../../shared';

export class RIB implements BaseEntity {
    constructor(
        public id?: number,
        public iban?: string,
        public bic?: string,
        public bankReference?: BaseEntity,
    ) {
    }
}
