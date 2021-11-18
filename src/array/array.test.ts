import { isIntegerArrayIndexValid, isPositiveArrayIndexValid, safeSwapItemsInArray } from './array';

describe('array', () => {

    describe('index', () => {

        it('isPositiveArrayIndexValid()', () => {
            const arr = [1, 2, 3];

            expect(isPositiveArrayIndexValid(arr, 0)).toBe(true);
            expect(isPositiveArrayIndexValid(arr, 1)).toBe(true);
            expect(isPositiveArrayIndexValid(arr, 2)).toBe(true);

            expect(isPositiveArrayIndexValid(arr, -1)).toBe(false);
            expect(isPositiveArrayIndexValid(arr, 2.3)).toBe(false);
            expect(isPositiveArrayIndexValid(arr, 4)).toBe(false);
        });

        it('isIntegerArrayIndexValid()', () => {
            const arr = [1, 2, 3];

            expect(isIntegerArrayIndexValid(arr, -1)).toBe(true);
            expect(isIntegerArrayIndexValid(arr, -2)).toBe(true);
            expect(isIntegerArrayIndexValid(arr, -3)).toBe(true);

            expect(isIntegerArrayIndexValid(arr, 0)).toBe(true);
            expect(isIntegerArrayIndexValid(arr, 1)).toBe(true);
            expect(isIntegerArrayIndexValid(arr, 2)).toBe(true);

            expect(isIntegerArrayIndexValid(arr, 1.1)).toBe(false);
            expect(isIntegerArrayIndexValid(arr, -4)).toBe(false);
            expect(isIntegerArrayIndexValid(arr, 3)).toBe(false);
        });

    });

    describe('safeSwapItemsInArray()', () => {

        it('positive valid indexes', () => {
            const arr = [1, 2, 3, 4];
            const res = safeSwapItemsInArray(arr, 1, 2);

            expect(res).toBe(true);
            expect(arr).toEqual([1, 3, 2, 4]);
        });

        it('negative valid indexes', () => {
            const arr = [1, 2, 3, 4];
            const res = safeSwapItemsInArray(arr, 0, -1);

            expect(res).toBe(true);
            expect(arr).toEqual([4, 2, 3, 1]);
        });

        it('invalid indexes', () => {
            const arr = [1, 2, 3, 4];

            expect(safeSwapItemsInArray(arr, 1, 100)).toEqual(false);
            expect(safeSwapItemsInArray(arr, 1, -5)).toEqual(false);
            expect(safeSwapItemsInArray(arr, 1, 2.2)).toEqual(false);

            expect(arr).toEqual([1, 2, 3, 4]);
        });

    });

});
