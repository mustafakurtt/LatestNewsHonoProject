import ICategoryDal from "../../dataAccess/abstract/ICategoryDal";
import SqliteCategoryDal from "../../dataAccess/concrete/sqlite/sqliteCategoryDal";
import Category from "../../entities/Category";
import ICategoryService from "../abstract/ICategoryService";

export default class CategoryManager implements ICategoryService {
    private _categoryDal: ICategoryDal;

    constructor() {
        this._categoryDal = new SqliteCategoryDal();
    }

    Add(entity: Category): Promise<Category> {
        return this._categoryDal.create(entity);
    }

    Update(id: string, entity: Category): Promise<Category> {
        return this._categoryDal.update(id, entity);
    }

    Delete(id: string): Promise<Category> {
        return this._categoryDal.delete(id);
    }

    GetAll(): Promise<Category[]> {
        return this._categoryDal.getAll();
    }

    GetById(id: string): Promise<Category> {
        return this._categoryDal.getById(id);
    }
}