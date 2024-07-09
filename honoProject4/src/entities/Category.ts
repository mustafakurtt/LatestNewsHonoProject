import BaseEntity from "./BaseEntity";

export default class Category extends BaseEntity {
    name: string = "";
    description: string = "";
    constructor() {
        super();
    }

    setProperties(data: any) {
        this.name = data.name;
        this.description = data.description;
    }
}