import ITagDal from "../../dataAccess/abstract/ITagDal";
import SqliteTagDal from "../../dataAccess/concrete/sqlite/sqliteTagDal";
import Tag from "../../entities/Tag";
import ITagService from "../abstract/ITagService";

export default class TagManager implements ITagService {
    private _tagDal: ITagDal;
    constructor() {
        this._tagDal = new SqliteTagDal();
    }
    Add(entity: Tag): Promise<Tag> {
        return this._tagDal.create(entity);
    }
    Update(id:string,entity: Tag): Promise<Tag> {
        return this._tagDal.update(id,entity);
    }
    Delete(id: string): Promise<Tag> {
        return this._tagDal.delete(id);
    }
    GetAll(): Promise<Tag[]> {
        return this._tagDal.getAll();
    }
    GetById(id: string): Promise<Tag> {
        return this._tagDal.getById(id);
    }



}