import ITagDal from "../../dataAccess/abstract/ITagDal";
import SqliteTagDal from "../../dataAccess/concrete/sqlite/sqliteTagDal";
import Tag from "../../entities/Tag";
import ITagService from "../abstract/ITagService";
import BaseManager from "./BaseManager";

export default class TagManager extends BaseManager<Tag> implements ITagService {
    private _tagDal: ITagDal = new SqliteTagDal();

    constructor() {
        super(SqliteTagDal, Tag, "ITagService");
    }
}