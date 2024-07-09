import News from "../../../entities/News";
import InstanceService from "../../../InstanceService";
import INewsDal from "../../abstract/INewsDal";
import SqliteBaseDal from "./sqliteBaseDal";


export default class SqliteNewsDal extends SqliteBaseDal<News> implements INewsDal{

    constructor() {
        super(News,"INewsDal");
    }
}