export type TCanHandle<T> = (item: T) => boolean;
export type TChainHandler<T> = (item: T) => unknown;

export interface IRegisterHandlerParams<T> {
    canHandle: TCanHandle<T>;
    handler: TChainHandler<T>;
    passThrough: boolean;
}

export type THandlerFilterFn<T> = (handlerParams: IRegisterHandlerParams<T>) => boolean;

/**
 * Questions:
 * What if you need the return value of the handler functions?
 * What if you have multiple handlers that can handle it?
 * Do you stop at the first one that does not have passThrough?
 * Maybe come up with multiple strategies? HANDLE_ALL, BREAK_ON_FIRST, etc...
 */
export class ChainOfResponsibility<T> {
    private _chain: IRegisterHandlerParams<T>[] = [];

    registerHandler(params: IRegisterHandlerParams<T>) {
        this._chain.push(params);
    }

    registerHandlers(handlerParamsArr: IRegisterHandlerParams<T>[]) {
        handlerParamsArr
            .forEach(this.registerHandler);
    }

    filterHandlers(handlerFilterFn: THandlerFilterFn<T>) {
        this._chain = this._chain
            .filter(handlerFilterFn);
    }

    clone(): ChainOfResponsibility<T> {
        const newChain = new ChainOfResponsibility<T>();
        newChain.registerHandlers(this._chain);
        return newChain;
    }

    handleItem(item: T) {
        for (let i = 0; i < this._chain.length; i++) {
            const currentHandlerParams = this._chain[i];

            if (currentHandlerParams.canHandle(item)) {
                currentHandlerParams.handler(item);
            }

            if (!currentHandlerParams.passThrough) {
                break;
            }
        }
    }
}
