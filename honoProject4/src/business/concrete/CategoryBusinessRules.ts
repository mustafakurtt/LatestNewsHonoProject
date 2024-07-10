import ICategoryDal from "../../dataAccess/abstract/ICategoryDal";
import Category from "../../entities/Category";
import BusinessError from "../../utils/errors/BusinessError";

export default class CategoryBusinessRules {
    private _categoryDal: ICategoryDal
    constructor(categoryDal: ICategoryDal) {
        this._categoryDal = categoryDal;
    }

    checkIfCategoryIsNull(category: Category | null){
        if (category == null) {
            throw new BusinessError("Category not found",404,"CategoryBusinessRules")
        }
    }

    async checkIfCategoryNameExists(categoryName: string){
        const category =await this._categoryDal.getCategoryByName(categoryName);
        console.log(category);
        
        if (category != null) {
            throw new BusinessError("Category name already exists",400,"CategoryBusinessRules")
        }
    }
}