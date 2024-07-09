import ICategoryDal from "../../dataAccess/abstract/ICategoryDal";
import SqliteCategoryDal from "../../dataAccess/concrete/sqlite/sqliteCategoryDal";
import Category from "../../entities/Category";
import ICategoryService from "../abstract/ICategoryService";
import BaseManager from "./BaseManager";
import CategoryBusinessRules from "./CategoryBusinessRules";

export default class CategoryManager extends BaseManager<Category> implements ICategoryService {
    private _categoryDal: ICategoryDal = new SqliteCategoryDal();
    private _categoryBusinessRules: CategoryBusinessRules;

    constructor() {
        super(SqliteCategoryDal, Category,"ICategoryService");
        this._categoryBusinessRules = new CategoryBusinessRules(this._categoryDal);
    }
    
    async Add(entity: Category): Promise<Category | null> {
        // await this._categoryBusinessRules.checkCategoryNameExists(entity.name)
        // return await super.Add(entity);
        return await super.Add(entity);
    }
 
    async Update(id:string,entity: Category): Promise<Category | null> {
        return await super.Update(id,entity);
    }

    async Delete(id: string): Promise<string | null> {
        return await super.Delete(id);
    }

    async GetById(id: string): Promise<Category | null> {
        return await super.GetById(id);
    }

    async GetAll(): Promise<Category[]> {
        return await super.GetAll();
    }
}