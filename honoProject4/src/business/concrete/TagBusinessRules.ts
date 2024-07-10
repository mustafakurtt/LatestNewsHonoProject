import ITagDal from "../../dataAccess/abstract/ITagDal";
import Tag from "../../entities/Tag";
import BusinessError from "../../utils/errors/BusinessError";


export default class TagBusinessRules {
    private _tagDal: ITagDal
    constructor(tagDal: ITagDal) {
        this._tagDal = tagDal;
    }

    checkIfTagIsNull(tag: Tag | null){
        if (tag == null) {
            throw new BusinessError("Tag not found",404,"TagBusinessRules")
        }
    }

    async checkIfTagNameExists(tagName: string){
        const tag =await this._tagDal.getTagByName(tagName);
        console.log(tag);
        
        if (tag != null) {
            throw new BusinessError("Tag name already exists",400,"TagBusinessRules")
        }
    }
}