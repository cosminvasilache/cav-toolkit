export type TFilterFunction<T> = (item: T) => boolean;

export interface IConsolidateArrParams<T> {
    sourceList: T[],
    whiteList?: T[],
    blackList?: T[],
    filterFn?: TFilterFunction<T>,
}

export function consolidateArr<T>({
    sourceList,
    whiteList,
    blackList,
    filterFn,
}: IConsolidateArrParams<T>): T[] {
    let finalArr = sourceList;

    if (filterFn) {
        finalArr = finalArr
            .filter(filterFn);
    }

    if (whiteList !== undefined && whiteList.length > 0) {
        finalArr = finalArr
            .filter((item) => {
                return whiteList.includes(item);
            });
    }

    if (blackList !== undefined && blackList.length > 0) {
        finalArr = finalArr
            .filter((item) => {
                return !blackList.includes(item);
            });
    }

    return finalArr;
}

/**
 * Swaps the position inside the given array of the items located at index1 and index2.
 * It does no validation to the indexes.
 */
export function swapItemsInArray<T>(arr: T[], index1: number, index2: number) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

/**
 * Swaps the position inside the given array of the items located at index1 and index2.
 * It does no validation to the indexes.
 */
export function swapItemsInArray2<T>(arr: T[], index1: number, index2: number) {
    [arr[index1], arr[index2]] = [arr[index2], arr[index1]];
}

/**
 * Converts negative indexes into the appropriate positive index.
 * It does not do any validation of the index.
 */
export function normalizeArrayIndex<T>(arr: T[], index: number) {
    return index < 0 ?
        arr.length + index :
        index;
}

/**
 * Validates an array index.
 */
export function isPositiveArrayIndexValid<T>(arr: T[], index: number) {
    if (!Number.isInteger(index)) {
        return false;
    }
    if (index >= arr.length) {
        return false;
    }
    if (index < 0) {
        return false;
    }
    return true;
}

/**
 * Validates an array index.
 * Allows negative indexes: -1 ... -arr.length.
 */
export function isIntegerArrayIndexValid<T>(arr: T[], index: number) {
    const normalizedIndex = normalizeArrayIndex(arr, index);
    return isPositiveArrayIndexValid(arr, normalizedIndex);
}

/**
 * Swaps the position inside the given array of the items located at index1 and index2.
 * If the indexes are not valid, returns false and does not alter the array.
 * If the indexes are valid returns true.
 */
export function safeSwapItemsInArray<T>(arr: T[], index1: number, index2: number) {
    const ni1 = normalizeArrayIndex(arr, index1);
    const ni2 = normalizeArrayIndex(arr, index2);

    if (
        !isPositiveArrayIndexValid(arr, ni1)
        || !isPositiveArrayIndexValid(arr, ni2)
    ) {
        return false;
    }

    swapItemsInArray(
        arr,
        ni1,
        ni2,
    );

    return true;
}
