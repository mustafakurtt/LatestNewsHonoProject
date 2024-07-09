import IBaseDal from "../../dataAccess/abstract/IBaseDal";
import BaseEntity from "../../entities/BaseEntity";
import InstanceService from "../../InstanceService";
import BusinessError from "../../utils/errors/BusinessError";
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
    entityConstructor: EntityConstructor<T>,
    interfaceName: string
  ) {
    this._entityDal = new entityDalConstructor();
    this._entityConstructor = entityConstructor;
    InstanceService.set(interfaceName, this);
  }

  async Add(entity: T): Promise<T | null> {
    console.log(`BaseManager.Add`);
    const newEntity = new this._entityConstructor();
    newEntity.setProperties(entity);
    return await this._entityDal.create(newEntity);
  }
 
  async Update(id: string, entity: T): Promise<T | null> {
    console.log(`BaseManager.Update`);
    const oldEntity = await this._entityDal.getById(id);
    if (oldEntity === null) throw new BusinessError("Not Found",404,"BaseManager.update", "Entity not found")
    const updatedEntity = this.updateProduct(oldEntity, entity);
    return await this._entityDal.update(id, updatedEntity);
  }

  async Delete(id: string): Promise<string | null> {
    console.log(`BaseManager.Delete`);
    const entity = await this._entityDal.getById(id);
    if (entity === null) throw new BusinessError("Not Found",404,"BaseManager.delete", "Entity not found")
    return await this._entityDal.delete(id);
  }
 
  async GetById(id: string): Promise<T | null> {
    console.log(`BaseManager.GetById`);

    const response = await this._entityDal.getById(id);
    return response;  
  }

  async GetAll(): Promise<T[]> {
    console.log(`BaseManager.GetAll`);

    return await this._entityDal.getAll();
  }

  private updateProduct(
    oldProduct: T,
    newProductData: Partial<Omit<T, "id" | "createdAt">>
  ): T {
    const updatedProduct = { ...oldProduct };

    for (const key in newProductData) {
      if (
        newProductData.hasOwnProperty(key) &&
        key !== "id" &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "deletedAt"
      ) {
        (updatedProduct as any)[key] = (newProductData as any)[key];
      }
    }
    (updatedProduct as any).updatedAt = new Date().toISOString();
    return updatedProduct;
  }
}
