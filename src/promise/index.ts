export async function errorHandledPromise<T>(p: Promise<T>): Promise<[T | null, Error | null]> {
    try {
        const value = await p;
        return [value, null];
    } catch (e) {
        return [null, e]
    }
}

export function wrapValueInPromiseWithDelay<T>(value: T, delay: number = 0): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(value);
        }, delay);
    });
}
