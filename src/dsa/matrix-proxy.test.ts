import { IVectorMatrix } from "./matrix";
import { getProxyHander } from "./matrix-proxy";

describe('matrix-proxy', () => {
    let matrix: IVectorMatrix<number>;
    const numRows = 2;
    const numColumns = 2;

    beforeEach(() => {
        matrix = [
            1, 2,
            3, 4,
        ];
    });

    it('should retrieve items from one dimensional array, based on coordinate notation', () => {
        const matrixProxy = new Proxy(matrix, getProxyHander(numRows, numColumns));

        expect(matrixProxy['0, 0']).toEqual(1);
        expect(matrixProxy['0, 1']).toEqual(2);
        expect(matrixProxy['1, 0']).toEqual(3);
        expect(matrixProxy['1, 1']).toEqual(4);

        expect(matrixProxy['-1, -1']).toEqual(undefined);
        expect(matrixProxy['10, 100']).toEqual(undefined);
    });

    describe('setting a value', () => {

        it('should work with coordinate notation for valid coordinates for the given matrix', () => {
            const matrixProxy = new Proxy(matrix, getProxyHander(numRows, numColumns));
            const valueToSet = 123;

            matrixProxy['0, 1'] = valueToSet;

            expect(matrix[1]).toEqual(valueToSet);
        });

        it('should throw if the coordinates are invalid for the given matrix', () => {
            const matrixProxy = new Proxy(matrix, getProxyHander(numRows, numColumns));
            const valueToSet = 123;


            expect(() => {
                matrixProxy['10, 100'] = valueToSet;
            }).toThrow();
        });

    });


    // it('should enumerate keys as coordinates', () => {
    //     expect(Object.keys(matrix)).toEqual(['0, 0', '0, 1', '1, 0', '1, 1']);
    // });

});
