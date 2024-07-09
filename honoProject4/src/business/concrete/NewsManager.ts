import INewsDal from "../../dataAccess/abstract/INewsDal";
import SqliteNewsDal from "../../dataAccess/concrete/sqlite/sqliteNewsDal";
import News from "../../entities/News";
import INewsService from "../abstract/INewsService";

export default class NewsManager implements INewsService {
    private _newsDal: INewsDal;
    constructor() {
        this._newsDal = new SqliteNewsDal();
    }

    Add(entity: News): Promise<News> {
        const newToAdd = new News();
        newToAdd.bindParameters(entity);
        return this._newsDal.create(newToAdd);
    }

    // Complete the Update method
    async Update(id: string, entity: News): Promise<News> {
        const newToUpdate =await this._newsDal.getById(id) as News;
        newToUpdate.bindParameters(entity);
        return this._newsDal.update(id, entity);
    }
    Delete(id: string): Promise<News> {
        return this._newsDal.delete(id);
    }
    GetById(id: string): Promise<News> {
        return this._newsDal.getById(id);
    }
    GetAll(): Promise<News[]> {
        return this._newsDal.getAll();
    }

}