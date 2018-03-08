import { BaseEntity } from './../../shared';

export class Customer implements BaseEntity {
    constructor(
        public id?: number,
        public firstName?: string,
        public lastName?: string,
        public birthday?: any,
        public accounts?: BaseEntity[],
        public credits?: BaseEntity[],
        public notifications?: BaseEntity[],
        public reports?: BaseEntity[],
    ) {
    }
}
