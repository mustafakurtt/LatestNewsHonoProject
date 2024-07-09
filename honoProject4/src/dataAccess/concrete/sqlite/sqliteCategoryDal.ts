import Category from "../../../entities/Category";
import InstanceService from "../../../InstanceService";
import ICategoryDal from "../../abstract/ICategoryDal";
import SqliteBaseDal from "./sqliteBaseDal";

export default class SqliteCategoryDal extends SqliteBaseDal<Category> implements ICategoryDal {

    constructor() {
        super(Category,"ICategoryDal"); // Category sınıfının yapılandırıcısını çağırarak uygun parametreyi sağlıyoruz
    }
    async getCategoryByName(categoryName: string): Promise<Category | null> {
        const statement = `SELECT * FROM ${this.tableName} WHERE name = ?`;
        const response = this.db.prepare(statement).as(Category).get(categoryName);
        return response;
    }

    

}