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

export class CountMap<T> {
    private _map = new Map<T, number>();

    addItem(item: T): number {
        if (!this._map.has(item)) {
            this._map.set(item, 0);
        }
        // @ts-expect-error
        const itemCounter = this._map.get(item) + 1;
        this._map.set(item, itemCounter);
        return itemCounter;
    }

    getMap() {
        return this._map;
    }

    // TODO: implement a better statistical metric
    areItemsEvenlyDistributed(): boolean {
        const mapValuesArray = Array.from(this._map.values());
        const min = Math.min(...mapValuesArray);
        const max = Math.max(...mapValuesArray);
        const amplitude = max - min;
        return amplitude < max / 10;
    }
}
