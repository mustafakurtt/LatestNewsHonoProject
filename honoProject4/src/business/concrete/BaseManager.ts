import IBaseDal from "../../dataAccess/abstract/IBaseDal";
import BaseEntity from "../../entities/BaseEntity";
import IBaseService from "../abstract/IBaseService";

type EntityConstructor<T> = new () => T;
type DalConstructor<T> = new () => IBaseDal<T>;

export default class BaseManager<T extends BaseEntity>
  implements IBaseService<T>
{
  private _entityDal: IBaseDal<T>;
  private _entityConstructor: EntityConstructor<T>;

  constructor(
    entityDalConstructor: DalConstructor<T>,
    entityConstructor: EntityConstructor<T>
  ) {
    this._entityDal = new entityDalConstructor();
    this._entityConstructor = entityConstructor;
  }

  async Add(entity: T): Promise<T> {
    const newEntity = new this._entityConstructor();
    newEntity.bindParameters(entity);
    return await this._entityDal.create(newEntity);
  }

  async Update(id: string, entity: T): Promise<T> {
    const newEntity = new this._entityConstructor();
    newEntity.bindParameters(entity);
    return await this._entityDal.update(id, newEntity);
  }

  async Delete(id: string): Promise<T> {
    return await this._entityDal.delete(id);
  }

  async GetById(id: string): Promise<T> {
    return await this._entityDal.getById(id);
  }

  async GetAll(): Promise<T[]> {
    return await this._entityDal.getAll();
  }
}
