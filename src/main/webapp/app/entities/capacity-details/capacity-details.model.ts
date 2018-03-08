import { BaseEntity } from './../../shared';

export class CapacityDetails implements BaseEntity {
    constructor(
        public id?: number,
        public description?: string,
        public ammount?: number,
        public retreatCapacity?: BaseEntity,
    ) {
    }
}
