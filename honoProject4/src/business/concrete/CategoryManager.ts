import ICategoryDal from "../../dataAccess/abstract/ICategoryDal";
import SqliteCategoryDal from "../../dataAccess/concrete/sqlite/sqliteCategoryDal";
import Category from "../../entities/Category";
import ICategoryService from "../abstract/ICategoryService";
import BaseManager from "./BaseManager";

export default class CategoryManager extends BaseManager<Category> implements ICategoryService {
    private _categoryDal: ICategoryDal = new SqliteCategoryDal();

    constructor() {
        super(SqliteCategoryDal, Category);
    }
}