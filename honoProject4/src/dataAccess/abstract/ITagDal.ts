import Tag from "../../entities/Tag";
import IBaseDal from "./IBaseDal";

export default interface ITagDal extends IBaseDal<Tag> { 
    getTagByName(tagName: string): Promise<Tag | null>
}