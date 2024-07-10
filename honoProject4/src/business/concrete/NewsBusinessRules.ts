import INewsDal from "../../dataAccess/abstract/INewsDal";
import BusinessError from "../../utils/errors/BusinessError";

export default class NewsBusinessRules {
    private _newsDal: INewsDal
    constructor(newsDal: INewsDal) {
        this._newsDal = newsDal;
    }

    checkIfNewsIsNull(news: any | null){
        if (news == null) {
            throw new BusinessError("News not found",404,"NewsBusinessRules")
        }
    }
}