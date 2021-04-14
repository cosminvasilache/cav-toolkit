/**
 * TODO:
 * Add comparator function.
 */

import { swapItemsInArray } from "../array/array";
import { shuffleArr } from "../random/random";
import { TComparatorFunction } from "../utils/utils";

export type TSortingFunction<T> = (arr: T[], comparatorFunction?: TComparatorFunction<T>) => T[];

// n**2 =======================================================

export function bubbleSort<T>(arr: T[], comparatorFunction?: TComparatorFunction<T>): T[] {
    for (let i = 0; i < arr.length - 1; i++) {
        let hasPerformedAnySwaps = false;

        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swapItemsInArray(arr, j, j + 1);

                hasPerformedAnySwaps = true;
            }
        }

        if (!hasPerformedAnySwaps) {
            break;
        }
    }

    return arr;
}

export function selectionSort<T>(arr: T[], comparatorFunction?: TComparatorFunction<T>) {
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        swapItemsInArray(arr, i, minIndex);
    }

    return arr;
}

export function insertionSort<T>(arr: T[], comparatorFunction?: TComparatorFunction<T>) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j > 0; j++) {
            if (arr[j] < arr[j - 1]) {
                swapItemsInArray(arr, j, j - 1);
            } else {
                break;
            }
        }
    }

    return arr;
}

// n*log(n) ===================================================

// TODO: optimize
// - use insertion sort for small arrays (also small recurision partitions), cutoff ~ 10 items
// - do not pick the partition element as the first one, calculate the median of 3 (random) items
export function quickSort<T>(arr: T[], comparatorFunction?: TComparatorFunction<T>): T[] {
    shuffleArr(arr);

    _quickSortRecusiveSort(arr, 0, arr.length - 1);

    return arr;
}

function _quickSortPartition<T>(arr: T[], lowIndex: number, highIndex: number): number {
    let i = lowIndex;
    let j = highIndex + 1;
    while (true) {
        while (arr[++i] < arr[lowIndex]) {
            if (i === highIndex) {
                break;
            }
        }

        while (arr[lowIndex] < arr[--j]) {
            if (j === lowIndex) {
                break;
            }
        }

        if (i >= j) {
            break;
        }

        swapItemsInArray(arr, i, j);
    }

    swapItemsInArray(arr, lowIndex, j);
    return j;
}

function _quickSortRecusiveSort<T>(arr: T[], lowIndex: number, highIndex: number): void {
    if (highIndex <= lowIndex) {
        return;
    }
    const j = _quickSortPartition(arr, lowIndex, highIndex);
    _quickSortRecusiveSort(arr, lowIndex, j - 1);
    _quickSortRecusiveSort(arr, j + 1, highIndex);
}
