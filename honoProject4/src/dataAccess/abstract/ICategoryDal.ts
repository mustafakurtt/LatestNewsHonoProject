import Category from "../../entities/Category";
import IBaseDal from "./IBaseDal";


export default interface ICategoryDal extends IBaseDal<Category> {
    getCategoryByName(categoryName: string): Promise<Category | null>
}