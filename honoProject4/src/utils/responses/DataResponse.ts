import IResponse from "./IResponse";

export default class DataResponse implements IResponse {
    public statusCode:number;
    public isSuccess: boolean = false
    public message: string;
    public data: any;
    public time: string;

    constructor(isSuccessful: boolean, message: string, data: any, statusCode:number = 200) {
        this.isSuccess = isSuccessful;
        this.message = message;
        this.data = data;
        this.time = new Date().toISOString();
        this.statusCode = statusCode;
    }
}