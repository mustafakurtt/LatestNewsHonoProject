import IResponse from "./IResponse";

export default class Response implements IResponse {
    public status: number = 500
    public isSuccessful: boolean = false
    public message: string;
    public time: string;

    constructor(status: number, isSuccessful: boolean, message: string) {
        this.status = status;
        this.isSuccessful = isSuccessful;
        this.message = message;
        this.time = new Date().toISOString();
    }
}