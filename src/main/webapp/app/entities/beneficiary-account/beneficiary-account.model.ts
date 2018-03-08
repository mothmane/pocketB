import { BaseEntity } from './../../shared';

export class BeneficiaryAccount implements BaseEntity {
    constructor(
        public id?: number,
        public label?: string,
        public account?: BaseEntity,
    ) {
    }
}
