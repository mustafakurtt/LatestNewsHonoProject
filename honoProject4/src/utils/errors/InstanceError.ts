// utils/errors/InstanceError.ts
export class InstanceError extends Error {
    public readonly code: number;
    public readonly location: string;
    public readonly additionalInfo?: any;

    constructor(message: string, code: number, location: string, additionalInfo?: any) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.code = code;
        this.location = location;
        this.additionalInfo = additionalInfo;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = new Error().stack;
        }
    }
}

export default InstanceError;
