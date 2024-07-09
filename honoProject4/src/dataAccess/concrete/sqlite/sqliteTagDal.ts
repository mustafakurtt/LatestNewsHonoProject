import Tag from "../../../entities/Tag";
import InstanceService from "../../../InstanceService";
import ITagDal from "../../abstract/ITagDal";
import SqliteBaseDal from "./sqliteBaseDal";


export default class SqliteTagDal extends SqliteBaseDal<Tag> implements ITagDal {

    constructor() {
        super(Tag,"ITagDal");
    }
}