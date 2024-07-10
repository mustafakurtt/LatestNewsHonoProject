import BaseEntity from "./BaseEntity";
import Tag from "./Tag";

export default class News extends BaseEntity {
    userId:string = "";
    title : string = "";
    content : string = "";
    categoryId : number = 0;
    tagIds : Tag[] = [];
    imageUrl : string = "";
    constructor() {
        super();
    }

    setProperties(data: any) {
        this.title = data.title;
        this.content = data.content;
        this.categoryId = data.categoryId;
        this.tagIds = data.tags;
        this.userId = data.userId;
        this.imageUrl = data.imageUrl;
    }
}