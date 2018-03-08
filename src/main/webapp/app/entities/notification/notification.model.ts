import { BaseEntity } from './../../shared';

export class Notification implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public date?: any,
        public object?: string,
        public description?: string,
        public customer?: BaseEntity,
    ) {
    }
}
