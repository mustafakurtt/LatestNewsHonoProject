
export default class BusinessError extends Error {
    public readonly code: number;
    public readonly location: string;
    public readonly additionalInfo?: any;
    public readonly data?: string;

    constructor(message: string, code: number, location: string, additionalInfo?: any, data?: string) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.code = code;
        this.location = location;
        this.additionalInfo = additionalInfo;
        this.data = data;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error().stack;
        }
    }
}