import { v4 as uuidv4 } from 'uuid';

export default class Entity {
    id: string;
    createdAt: string;
    updatedAt?: string;
    deletedAt?: string;
    constructor() {
        this.id = uuidv4();
        this.createdAt = new Date().toISOString();
        this.updatedAt = undefined;
        this.deletedAt = undefined;
    }
}