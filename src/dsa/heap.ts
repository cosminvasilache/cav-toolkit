/**
 * TODO:
 * Take an OOP aproach?
 * make the heap condition generic. Symbol on the heap array object?
 */

import { defaultComparator } from "./utils";

export type THeapArr<T> = [null, ...T[]];
export type THeapCondition<T> = (a: T, b: T) => boolean;

export function createHeap<T>(): THeapArr<T> {
    return [null];
}

export function getMaxFromHeap<T>(heap: THeapArr<T>) {
    return heap[1];
}

// TODO: implement
export function deleteMaxFromHeap<T>(heap: THeapArr<T>): T {
    const max = heap[1];

    _exchangeValuesAtIndexes(heap, 1, heap.length - 1);
    heap.pop();
    _sinkValueDownInHeap(heap, 1);
    // prevent loitering ??

    return max;
}

export function isHeapEmpty<T>(heap: THeapArr<T>) {
    return heap.length === 1;
}

export function getHeapSize<T>(heap: THeapArr<T>): number {
    return heap.length - 1;
}

export function insertInHeap<T>(heap: THeapArr<T>, valueToBeInserted: T): void {
    heap.push(valueToBeInserted);
    _swimValueUpInHeap(heap, heap.length - 1);
}

// PRIVATE ========================================================

// TODO: fix type errors
function _swimValueUpInHeap<T>(heap: THeapArr<T>, indexOfValue: number): void {
    let parentIndex: number = _getParentIndexOfValueAtIndex(indexOfValue);
    while (
        indexOfValue > 1
        // @ts-expect-error - parentIndex and indexOfValue are both greater than 0, so heap[index] can't be null
        && heap[parentIndex] < heap[indexOfValue]
    ) {
        _exchangeValuesAtIndexes(heap, indexOfValue, parentIndex);
        indexOfValue = parentIndex;
        parentIndex = _getParentIndexOfValueAtIndex(indexOfValue);
    }
}

// TODO: fix type errors
function _sinkValueDownInHeap<T>(heap: THeapArr<T>, indexOfValue: number): void {
    if (indexOfValue === 0) return;
    while (2 * indexOfValue <= heap.length) {
        let j = 2 * indexOfValue;
        if (
            j < heap.length
            // @ts-expect-error
            && defaultComparator(heap[j], heap[j + 1]) < 0
        ) {
            j++;
        }
        // @ts-expect-error
        if (defaultComparator(heap[indexOfValue], heap[j]) >= 0) {
            break;
        }
        _exchangeValuesAtIndexes(heap, indexOfValue, j);
        indexOfValue = j;
    }
}

function _getParentIndexOfValueAtIndex(indexOfValue: number): number {
    return Math.floor(indexOfValue / 2);
}

function _getChildrenIndexesOfParentIndex(indexOfParent: number): [number, number] {
    return [indexOfParent * 2, indexOfParent * 2 + 1];
}

function _exchangeValuesAtIndexes<T>(heap: THeapArr<T>, indexOfValueA: number, indexOfValueB: number): void {
    const temp = heap[indexOfValueA];
    heap[indexOfValueA] = heap[indexOfValueB];
    heap[indexOfValueB] = temp;
}

// UTILITIES ======================================================

// TODO: implement
export function heapToString<T>(heap: THeapArr<T>, valueGetter: (n: T) => string, indent: string = '\t'): string {
    // [null, T, S, R, P, N, O, A, E, I,  H,  G]
    // [0   , 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
    const retStr = '';
    return retStr;
}
