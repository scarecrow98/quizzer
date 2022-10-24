abstract class Exception {
    constructor(
        protected message: string,
        protected status: number = 500
    ) {
        //empty
    }

    getMessage(): string {
        return this.message;
    }

    getStatus(): number {
        return this.status;
    }
}

export class ApiException extends Exception {
    
}