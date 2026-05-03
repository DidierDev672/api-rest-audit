export declare class CircuitBreaker {
    private readonly threshold;
    private readonly timeout;
    private readonly resetTimeout;
    private failures;
    private lastFailureTime;
    private state;
    constructor(threshold?: number, timeout?: number, resetTimeout?: number);
    execute<T>(fn: () => Promise<T>): Promise<T>;
    private onSuccess;
    private onFailure;
    getState(): string;
}
export declare const circuitBreaker: CircuitBreaker;
//# sourceMappingURL=CircuitBreaker.d.ts.map