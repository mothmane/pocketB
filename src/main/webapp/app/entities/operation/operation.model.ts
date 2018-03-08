import { BaseEntity } from './../../shared';

export class Operation implements BaseEntity {
    constructor(
        public id?: number,
        public ammount?: number,
        public motif?: string,
        public details?: string,
        public date?: any,
        public card?: BaseEntity,
    ) {
    }
}
