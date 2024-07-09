import INewsDal from "../../dataAccess/abstract/INewsDal";
import SqliteNewsDal from "../../dataAccess/concrete/sqlite/sqliteNewsDal";
import News from "../../entities/News";
import INewsService from "../abstract/INewsService";
import BaseManager from "./BaseManager";

export default class NewsManager extends BaseManager<News> implements INewsService {
    private _newsDal: INewsDal = new SqliteNewsDal();

    constructor() {
        super(SqliteNewsDal, News,"INewsService");
    }
}