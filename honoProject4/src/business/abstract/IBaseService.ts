
export default interface IBaseService<T> {
    Add(entity: T): Promise<T | null>;
    Update(id:string,entity: T): Promise<T | null>;
    Delete(id: string): Promise<string | null>;
    GetById(id: string): Promise<T | null>;
    GetAll(): Promise<T[] | null>;
}