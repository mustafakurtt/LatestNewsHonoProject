
export default interface IBaseService<T> {
    Add(entity: T): Promise<T>;
    Update(id:string,entity: T): Promise<T>;
    Delete(id: string): Promise<T>;
    GetById(id: string): Promise<T>;
    GetAll(): Promise<T[]>;
}