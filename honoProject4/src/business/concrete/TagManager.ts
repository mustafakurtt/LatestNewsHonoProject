import ITagDal from "../../dataAccess/abstract/ITagDal";
import SqliteTagDal from "../../dataAccess/concrete/sqlite/sqliteTagDal";
import Tag from "../../entities/Tag";
import updateEntity from "../../utils/managers/updateEntity";
import ITagService from "../abstract/ITagService";
import BaseManager from "./BaseManager";
import TagBusinessRules from "./TagBusinessRules";

export default class TagManager extends BaseManager<Tag> implements ITagService {
    private _tagDal: ITagDal = new SqliteTagDal();
    private _tagBusinessRules: TagBusinessRules;


    constructor() {
        super(SqliteTagDal, Tag, "ITagService");
        this._tagBusinessRules = new TagBusinessRules(this._tagDal);
    }

    async Add(entity: Tag): Promise<Tag | null> {
        //Check if the tag name is exists
        await this._tagBusinessRules.checkIfTagNameExists(entity.name);
        return await super.Add(entity);
    }

    async Update(id: string, entity: Tag): Promise<Tag | null> {
        const oldTag = await this.GetById(id);
        //Check if the tag exists
        this._tagBusinessRules.checkIfTagIsNull(oldTag);
        //Update the tag
        const updatedTag = updateEntity<Tag>(oldTag as Tag, entity);
        return await super.Update(id, entity);
    }

    async Delete(id: string): Promise<string | null> {
        const tag = await this.GetById(id);
        //Check if the tag not exists
        this._tagBusinessRules.checkIfTagIsNull(tag);
        return await super.Delete(id);
    }

    async GetById(id: string): Promise<Tag | null> {
        const tag = await super.GetById(id);
        //Check if the tag not exists
        this._tagBusinessRules.checkIfTagIsNull(tag);

        return await super.GetById(id);
    }

    async GetAll(): Promise<Tag[]> {
        return await super.GetAll();
    }
}