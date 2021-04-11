export type TComparatorFunction<T> = (a: T, b: T) => number;

export function numberComparator(a: number, b: number): number {
    return a - b;
}

export function defaultComparator<T extends number | string>(a: T, b: T): number {
    if (a < b) {
        return -1;
    } else if (a === b) {
        return 0;
    } else { // a > b
        return 1;
    }
}
