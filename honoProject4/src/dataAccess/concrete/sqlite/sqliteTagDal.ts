import Tag from "../../../entities/Tag";
import InstanceService from "../../../InstanceService";
import ITagDal from "../../abstract/ITagDal";
import SqliteBaseDal from "./sqliteBaseDal";


export default class SqliteTagDal extends SqliteBaseDal<Tag> implements ITagDal {

    constructor() {
        super(Tag,"ITagDal");
    }

    async getTagByName(tagName: string): Promise<Tag | null> {
        const statement = `SELECT * FROM ${this.tableName} WHERE name = ?`;
        const response = this.db.prepare(statement).as(Tag).get(tagName);
        return response;
    }
}