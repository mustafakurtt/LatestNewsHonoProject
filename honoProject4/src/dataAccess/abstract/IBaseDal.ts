
export default interface IBaseDal<T> {
    create(data: T): Promise<T | null>;
    update(id: string, data: T): Promise<T | null>;
    delete(id: string): Promise<string | null>;
    getById(id: string): Promise<T|null>;
    getAll(): Promise<T[]>;
}