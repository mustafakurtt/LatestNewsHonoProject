import News from "../../../entities/News";
import INewsDal from "../../abstract/INewsDal";
import SqliteBaseDal from "./sqliteBaseDal";


export default class SqliteNewsDal extends SqliteBaseDal<News> implements INewsDal{
    constructor() {
        super(News); // News sınıfının yapılandırıcısını çağırarak uygun parametreyi sağlıyoruz
    }
}