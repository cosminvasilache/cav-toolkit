import { swapItemsInArray } from "../array/array";

export function randomInteger(maximumNumber: number): number {
    return Math.floor(Math.random() * maximumNumber);
}

export function randomIntegerBetween(min: number, max: number): number {
    return min + randomInteger(max - min);
}

export type Indexable<T> = {
    length: number;
    [key: number]: T;
};

export const getRandomIndex = <T>(indexableInput: Indexable<T>): number => {
    return randomInteger(indexableInput.length);
};

export const getRandomIndexableElement= <T>(indexableInput: Indexable<T>): T => {
    return indexableInput[getRandomIndex(indexableInput)];
};

export function shuffleArr<T>(arr: T[]): T[] {
    for (let i = 0; i < arr.length; i++) {
        const randomSwapIndex = randomInteger(i + 1);

        swapItemsInArray(arr, i, randomSwapIndex);
    }

    return arr;
}

export function getRandomArrayIndex<T>(arr: T[]): number {
    return randomInteger(arr.length);
}

export function getRandomArrayElement<T>(arr: T[]): T {
    return arr[getRandomArrayIndex(arr)];
}

export function extractRandomArrayElement<T>(arr: T[]): T {
    return arr.splice(getRandomArrayIndex(arr), 1)[0];
}

export const getRandomStringIndex = (inputString: string): number => {
    return randomInteger(inputString.length);
};
export const getRandomStringCharacter = (inputString: string): string => {
    if (inputString.length === 0) {
        return '';
    }
    return inputString[getRandomStringIndex(inputString)];
};

export const ASCII_LETTERS_LOWER_CASE = 'abcdefghijklmnopqrstuvwxyz';
export const ASCII_LETTERS_UPPER_CASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const DIGITS = '0123456789';
export const SAFE_URI_SYMBOLS = '-._~';
export const HEX_CHARACTERS_LOWER_CASE = `${DIGITS}abcdef`;
export const HEX_CHARACTERS_UPPER_CASE = `${DIGITS}ABCDEF`;
export const DEFAULT_ALPHABET = [
    ASCII_LETTERS_LOWER_CASE,
    ASCII_LETTERS_UPPER_CASE,
    DIGITS,
].join('');
export const ROMANIAN_DIACRITICS_LOWER_CASE = 'ăâîșț'
export const ROMANIAN_DIACRITICS_UPPER_CASE = 'ĂÂÎȘȚ';
export const GERMAN_DIACRITICS_LOWER_CASE = 'äöüß';
export const GERMAN_DIACRITICS_UPPER_CASE = 'ÄÖÜ'; // "ß" upper case is "SS" (2 characters)
export const FRENCH_DIACRITICS_LOWER_CASE = 'çéâêîôûàèìòùëïü';
export const FRENCH_DIACRITICS_UPPER_CASE = 'ÇÉÂÊÎÔÛÀÈÌÒÙËÏÜ';

export const generateRandomString = (stringLength: number = 256, alphabet: string = DEFAULT_ALPHABET) => {
    let result = '';
    for (let i = 0; i < stringLength; i++) {
        const currentRandomCharacter = getRandomStringCharacter(alphabet);
        result += currentRandomCharacter;
    }
    return result;
};
