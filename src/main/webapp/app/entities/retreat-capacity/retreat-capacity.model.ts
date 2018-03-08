import { BaseEntity } from './../../shared';

export class RetreatCapacity implements BaseEntity {
    constructor(
        public id?: number,
        public globalCapacity?: number,
        public capacityDetails?: BaseEntity[],
    ) {
    }
}
