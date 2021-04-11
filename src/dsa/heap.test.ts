import { isHeapEmpty, THeapArr, deleteMaxFromHeap } from "./heap";

describe('heap', () => {

    let heap: THeapArr<string>;

    beforeEach(() => {
        heap = [null, 'T', 'S', 'R', 'P', 'N', 'O', 'A', 'E', 'I', 'H', 'G'];
    });

    describe('_sink() method', () => {

        it('should place value at ', () => {

            expect(true).toEqual(true);
        });

    });

    describe('_swim() method', () => {

        it('', () => {

            expect(true).toEqual(true);
        });

    });

    it('should sort items when calling deleteMaxFromHeap() until the heap is empty', () => {
        const sortTargetArr = [];

        while (!isHeapEmpty(heap)) {
            const maxElement = deleteMaxFromHeap(heap);
            sortTargetArr.push(maxElement);
        }
        sortTargetArr.reverse();

        expect(sortTargetArr).toEqual([
            'A', 'E', 'G', 'H', 'I', 'N', 'O', 'P', 'R', 'S', 'T'
        ]);
    });

});
