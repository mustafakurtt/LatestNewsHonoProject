import IResponse from "./IResponse";

export default class DataResponse implements IResponse {
    public statusCode:number;
    public isSuccess: boolean = false
    public message: string;
    public data: any;
    public datatime: string;

    constructor(isSuccessful: boolean, message: string, data: any, statusCode:number = 200) {
        this.isSuccess = isSuccessful;
        this.message = message;
        this.data = data;
        this.datatime = new Date().toISOString();
        this.statusCode = statusCode;
    }
}