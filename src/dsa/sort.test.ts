import { shuffleArr } from "../random/random";
import { bubbleSort, insertionSort, quickSort, selectionSort, TSortingFunction } from "./sort";

let arr: number[];
let sortedArr: number[];

interface ISortTestParams<T> {
    sortingAlgorithm: TSortingFunction<T>,
    isStable: boolean,
}

const runSortTests = ({
    sortingAlgorithm,
    isStable,
}: ISortTestParams<number>) => () => {
    beforeEach(() => {
        arr = [1, 2, 3, 4, 5];
        sortedArr = arr.sort();
    });

    it('should work on reverse ordered array', () => {
        const reverseSortedArr = arr.sort().reverse();

        sortingAlgorithm(reverseSortedArr);

        expect(arr).toEqual(sortedArr);
    });

    it('should work on already sorted array', () => {
        const sortedArr = arr.sort();

        sortingAlgorithm(sortedArr);

        expect(arr).toEqual(sortedArr);
    });

    it('should work on suffled array', () => {
        const shuffledArr = shuffleArr(arr);

        sortingAlgorithm(shuffledArr);

        expect(arr).toEqual(sortedArr);
    });

    // TODO: implement
    it('should be stable', () => {

        expect(true).toEqual(true);
    });
};

describe('Bubble Sort', runSortTests({
    sortingAlgorithm: bubbleSort,
    isStable: true,
}));

describe('Selection Sort', runSortTests({
    sortingAlgorithm: selectionSort,
    isStable: false,
}));

describe('Insertion Sort', runSortTests({
    sortingAlgorithm: insertionSort,
    isStable: true,
}));

describe('Quick Sort', runSortTests({
    sortingAlgorithm: quickSort,
    isStable: false,
}));
