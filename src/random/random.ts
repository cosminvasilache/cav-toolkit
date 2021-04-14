import { swapItemsInArray } from "../array/array";

export function randomInteger(maximumNumber: number): number {
    return Math.floor(Math.random() * maximumNumber);
}

export function randomIntegerBetween(min: number, max: number): number {
    return min + randomInteger(max - min);
}

export function shuffleArr<T>(arr: T[]): T[] {
    for (let i = 0; i < arr.length; i++) {
        const randomSwapIndex = randomInteger(i + 1);

        swapItemsInArray(arr, i, randomSwapIndex);
    }

    return arr;
}

export function pickRandomArrayElement<T>(arr: T[]): T {
    const randomIndex = randomInteger(arr.length);
    return arr[randomIndex];
}
