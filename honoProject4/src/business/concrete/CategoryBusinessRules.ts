import ICategoryDal from "../../dataAccess/abstract/ICategoryDal";
import Category from "../../entities/Category";
import BusinessError from "../../utils/errors/BusinessError";

export default class CategoryBusinessRules {
    private _categoryDal: ICategoryDal
    constructor(categoryDal: ICategoryDal) {
        this._categoryDal = categoryDal;
    }
}