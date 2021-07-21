import { getCoordinatesFromLinearIndex, getLinearIndexFromCoordinates, getNeighboursAbsoluteIndexes, getNeighboursValidatedAbsoluteIndexes, getNeighboursWrappedAbsoluteIndexes, isIndexValid, wrapCoordinates } from './matrix';

/**
 *    |  0  1  2  3  4  5  6
 * ---+---------------------
 *  0 |  0  1  2  3  4  5  6
 *  1 |  7  8  9 10 11 12 13
 *  2 | 14 15 16 17 18 19 20
 *  3 | 21 22 23 24 25 26 27
 *  4 | 28 29 30 31 32 33 34
 *  5 | 35 36 37 38 39 40 41
 */

/**
 *    |   0   1   2   3   4   5   6
 * ---+----------------------------
 *  0 | 0,0 0,1 0,2 0,3 0,4 0,5 0,6
 *  1 | 1,0 1,1 1,2 1,3 1,4 1,5 1,6
 *  2 | 2,0 2,1 2,2 2,3 2,4 2,5 2,6
 *  3 | 3,0 3,1 3,2 3,3 3,4 3,5 3,6
 *  4 | 4,0 4,1 4,2 4,3 4,4 4,5 4,6
 *  5 | 5,0 5,1 5,2 5,3 5,4 5,5 5,6
 */

describe('matrix', () => {

    describe('isIndexValid()', () => {

        it('should correctly validate rows', () => {
            const isIndexValid$ = isIndexValid(5);

            expect(isIndexValid$(-1)).toEqual(false);
            expect(isIndexValid$(3)).toEqual(true);
            expect(isIndexValid$(5)).toEqual(false);
            expect(isIndexValid$(10)).toEqual(false);
        });

    });

    describe('getLinearIndexFromCoordinates()', () => {

        it('should correctly calculate the vector index', () => {
            const numRows = 6;
            const numColumns = 7;
            const row = 2;
            const column = 4;

            const getLinearIndexFromCoordinates$ = getLinearIndexFromCoordinates(numRows, numColumns);

            expect(getLinearIndexFromCoordinates$(0, 0)).toEqual(0);
            expect(getLinearIndexFromCoordinates$(row, column)).toEqual(18);
        });

    });

    describe('getCoordinatesFromLinearIndex', () => {

        it('should retrieve the correct coordinates', () => {
            const numRows = 6;
            const numColumns = 7;

            const getCoordinatesFromLinearIndex$ = getCoordinatesFromLinearIndex(numRows, numColumns);

            expect(getCoordinatesFromLinearIndex$(0)).toEqual([0, 0]);
            expect(getCoordinatesFromLinearIndex$(19)).toEqual([2, 5]);
            expect(getCoordinatesFromLinearIndex$(41)).toEqual([5, 6]);
        });

        it('should return null when index is invalid', () => {
            const numRows = 6;
            const numColumns = 7;

            const getCoordinatesFromLinearIndex$ = getCoordinatesFromLinearIndex(numRows, numColumns);

            expect(getCoordinatesFromLinearIndex$(-1)).toEqual(null);
            expect(getCoordinatesFromLinearIndex$(42)).toEqual(null);
        });

    });

    describe('wrapCoordinates()', () => {

        it('should wrap', () => {
            const numRows = 6;
            const numColumns = 7;
            const wrapCoordinates$ = wrapCoordinates(numRows, numColumns);

            // Overflowing corner coordinates
            expect(wrapCoordinates$(-1, -1)).toEqual([5, 6]); // NW
            expect(wrapCoordinates$(-1, 7)).toEqual([5, 0]); // NE
            expect(wrapCoordinates$(6, 7)).toEqual([0, 0]); // SE
            expect(wrapCoordinates$(6, -1)).toEqual([0, 6]); // SW
            // Normal, non overflowing coordinates
            expect(wrapCoordinates$(0, 0)).toEqual([0, 0]);
            expect(wrapCoordinates$(3, 4)).toEqual([3, 4]);
        });

    });

    describe('getNeighboursAbsoluteIndexes()', () => {

        it('should calculate correct indexes', () => {
            expect(getNeighboursAbsoluteIndexes(0, 0)).toEqual([
                [-1, -1], [-1, 0], [-1, 1],
                [0, -1], [0, 0], [0, 1],
                [1, -1], [1, 0], [1, 1],
            ]);
            expect(getNeighboursAbsoluteIndexes(2, 4)).toEqual([
                [1, 3], [1, 4], [1, 5],
                [2, 3], [2, 4], [2, 5],
                [3, 3], [3, 4], [3, 5],
            ]);
        });

    });

    describe('getNeighboursValidatedAbsoluteIndexes()', () => {

        it('should correctly mark out of bounds neighbours with null instead of coordinates', () => {
            const numRows = 6;
            const numCols = 7;
            const getNeighboursValidatedAbsoluteIndexes$ = getNeighboursValidatedAbsoluteIndexes(numRows, numCols);

            expect(getNeighboursValidatedAbsoluteIndexes$(0, 0)).toEqual([
                null, null, null,
                null, [0, 0], [0, 1],
                null, [1, 0], [1, 1],
            ]);
            expect(getNeighboursValidatedAbsoluteIndexes$(5, 6)).toEqual([
                [4, 5], [4, 6], null,
                [5, 5], [5, 6], null,
                null, null, null,
            ]);
        });

    });

    describe('getNeighboursWrappedAbsoluteIndexes()', () => {

        it('should correctly wrap indexes when the neighbours are out of bounds', () => {
            const numRows = 6;
            const numCols = 7;
            const getNeighboursWrappedAbsoluteIndexes$ = getNeighboursWrappedAbsoluteIndexes(numRows, numCols);

            expect(getNeighboursWrappedAbsoluteIndexes$(0, 0)).toEqual([
                [5, 6], [5, 0], [5, 1],
                [0, 6], [0, 0], [0, 1],
                [1, 6], [1, 0], [1, 1],
            ]);
            expect(getNeighboursWrappedAbsoluteIndexes$(5, 6)).toEqual([
                [4, 5], [4, 6], [4, 0],
                [5, 5], [5, 6], [5, 0],
                [0, 5], [0, 6], [0, 0],
            ]);
        });

    });

});
