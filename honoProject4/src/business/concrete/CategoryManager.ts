import ICategoryDal from "../../dataAccess/abstract/ICategoryDal";
import SqliteCategoryDal from "../../dataAccess/concrete/sqlite/sqliteCategoryDal";
import Category from "../../entities/Category";
import updateEntity from "../../utils/managers/updateEntity";
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

        //Check if the category name is exists
        await this._categoryBusinessRules.checkIfCategoryNameExists(entity.name);

        return await super.Add(entity);
    }
 
    async Update(id:string,entity: Category): Promise<Category | null> {
        
        const oldCategory = await this.GetById(id);

        //Check if the category exists
        this._categoryBusinessRules.checkIfCategoryIsNull(oldCategory);

        //Update the category
        const updatedCateogry = updateEntity<Category>(oldCategory as Category,entity);

        return await super.Update(id,updatedCateogry);
    }

    async Delete(id: string): Promise<string | null> {
        
        const category = await this.GetById(id);

        //Check if the category not exists
        this._categoryBusinessRules.checkIfCategoryIsNull(category);

        return await super.Delete(id);
    }

    async GetById(id: string): Promise<Category | null> {

        const category = await super.GetById(id);
        
        //Check if the category not exists
        this._categoryBusinessRules.checkIfCategoryIsNull(category);

        return await super.GetById(id);
    }

    async GetAll(): Promise<Category[]> {
        return await super.GetAll();
    }
}