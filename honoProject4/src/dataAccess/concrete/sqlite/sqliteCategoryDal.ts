import Category from "../../../entities/Category";
import ICategoryDal from "../../abstract/ICategoryDal";
import SqliteBaseDal from "./sqliteBaseDal";


export default class SqliteCategoryDal extends SqliteBaseDal<Category> implements ICategoryDal {
    constructor() {
        super(Category); // Category sınıfının yapılandırıcısını çağırarak uygun parametreyi sağlıyoruz
    }
}