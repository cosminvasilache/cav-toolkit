import { wrapValueInPromiseWithDelay, errorHandledPromise } from './index';

describe('wrapValueInPromiseWithDelay()', () => {

    it('should wait for a minimum of "delay" ms before resolving the value', async () => {
        const startTimestamp = Date.now();
        const value = 123;
        const delay = 1_000;

        await wrapValueInPromiseWithDelay(value, delay);

        expect(Date.now()).toBeGreaterThanOrEqual(startTimestamp + delay);
    });

    it('should return the wrapped value', async () => {
        const value = 'test';

        const awaitedValue = await wrapValueInPromiseWithDelay(value);

        expect(value).toEqual(awaitedValue);
    });

});

describe('errorHandledPromise()', () => {

    it('should correctly wrap a value', async () => {
        const value = 123;

        const [awaitedValue, awaitedError] = await errorHandledPromise(Promise.resolve(value));

        // @ts-expect-error
        expect(value).toEqual(awaitedValue);
        expect(awaitedError).toEqual(null);
    });

    it('should correctly wrap error', async () => {
        const err = 'the error';

        const [awaitedValue, awaitedError] = await errorHandledPromise(Promise.reject(err));

        // @ts-expect-error
        expect(err).toEqual(awaitedError);
        expect(awaitedValue).toEqual(null);
    });

});
