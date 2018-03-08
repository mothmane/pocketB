import { BaseEntity } from './../../shared';

export const enum CardStatus {
    'ACTIVE',
    'INACTIVE'
}

export const enum CardContactLessStatus {
    'ACTIVE',
    'INACTIVE'
}

export class Card implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public mouthlyPaiementCapacity?: number,
        public engagedPaiment?: number,
        public status?: CardStatus,
        public contactLessStatus?: CardContactLessStatus,
        public expiryLocalDate?: any,
        public accountDebited?: BaseEntity,
        public retreatCapacity?: BaseEntity,
        public operations?: BaseEntity[],
    ) {
    }
}
