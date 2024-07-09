
export default interface IBaseDal<T> {
    create(data: T): Promise<any>;
    update(id: string, data: T): Promise<any>;
    delete(id: string): Promise<any>;
    getById(id: string): Promise<any>;
    getAll(): Promise<any>;
}