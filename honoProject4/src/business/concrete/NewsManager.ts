import INewsDal from "../../dataAccess/abstract/INewsDal";
import SqliteNewsDal from "../../dataAccess/concrete/sqlite/sqliteNewsDal";
import News from "../../entities/News";
import updateEntity from "../../utils/managers/updateEntity";
import INewsService from "../abstract/INewsService";
import BaseManager from "./BaseManager";
import NewsBusinessRules from "./NewsBusinessRules";

export default class NewsManager
  extends BaseManager<News>
  implements INewsService
{
  private _newsDal: INewsDal = new SqliteNewsDal();
  private _newsBusinessRules: NewsBusinessRules;

  constructor() {
    super(SqliteNewsDal, News, "INewsService");
    this._newsBusinessRules = new NewsBusinessRules(this._newsDal);
  }

  async Add(entity: News): Promise<News | null> {
    return await super.Add(entity);
  }

    async Update(id: string, entity: News): Promise<News | null> {
        const oldNews = await this.GetById(id);
        //Check if the news exists
        this._newsBusinessRules.checkIfNewsIsNull(oldNews);
        //Update the news
        const updatedNews = updateEntity<News>(oldNews as News, entity);
        return await super.Update(id, updatedNews);
    }

    async Delete(id: string): Promise<string | null> {
        const news = await this.GetById(id);
        //Check if the news not exists
        this._newsBusinessRules.checkIfNewsIsNull(news);
        return await super.Delete(id);
    }

    async GetById(id: string): Promise<News | null> {
        const news = await super.GetById(id);
        //Check if the news not exists
        this._newsBusinessRules.checkIfNewsIsNull(news);
        return await super.GetById(id);
    }

    async GetAll(): Promise<News[]> {
        return await super.GetAll();
    }
}
