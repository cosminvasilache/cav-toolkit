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

export function swapItemsInArray<T>(arr: T[], index1: number, index2: number) {
    const temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}
