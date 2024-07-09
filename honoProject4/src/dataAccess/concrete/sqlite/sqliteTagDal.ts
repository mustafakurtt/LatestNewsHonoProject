import Tag from "../../../entities/Tag";
import ITagDal from "../../abstract/ITagDal";
import SqliteBaseDal from "./sqliteBaseDal";


export default class SqliteTagDal extends SqliteBaseDal<Tag> implements ITagDal {
    constructor() {
        super(Tag); // News sınıfının yapılandırıcısını çağırarak uygun parametreyi sağlıyoruz
    }
}