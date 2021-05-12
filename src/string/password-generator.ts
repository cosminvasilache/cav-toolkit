// CONSTANTS ==================================================

const LOWERCASE_LETTERS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const UPPERCASE_LETTERS = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];
const DIGITS = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
];
const SAFE_SPECIAL_CHARACTERS = [
    '!', '@', '#', '$'
];
const OTHER_SPECIAL_CHARACTERS = [
    '%', '^', '&', '*', '(', ')', '-', '='
];
const CHARACTER_SOURCES = {
    LOWERCASE_LETTERS,
    UPPERCASE_LETTERS,
    DIGITS,
    SAFE_SPECIAL_CHARACTERS,
    SPECIAL_CHARACTERS: [...SAFE_SPECIAL_CHARACTERS, ...OTHER_SPECIAL_CHARACTERS],
};

// TYPES ======================================================

type CharacterSource = keyof typeof CHARACTER_SOURCES;

type FrequencyMap = Record<string, number>;

interface CharacterSourceConfig {
    source: CharacterSource;
    weight: number;
}

type CharacterSourceFrequencyMap = {
    [key in CharacterSource]: number;
}

interface RandomPasswordGeneratorConfig {
    passwordLength: number;
    characterSources: CharacterSourceConfig[];
    atLeastOnceCharacterPerSourceIfLengthAllows: boolean;
}

// HELPERS ===================================================

function shuffleString(str: string) {
    const a = str.split("");
    let n = a.length;

    for (let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }

    return a.join("");
}

function randIntegerBetween(start: number, end: number): number {
    const amplitude = end - start;
    return start + Math.floor(Math.random() * amplitude);
}

function randomArrayElement<T>(array: T[]): T {
    return array[randIntegerBetween(0, array.length)];
}

function getRandomWeightedValue<T>(
    arr: T[],
    weightGetter: (arrItem: T) => number,
): T {
    const sumOfWeights = arr.reduce((acc, currentItem) => {
        return acc + weightGetter(currentItem);
    }, 0);
    const randWeight = Math.random() * sumOfWeights;

    let sumWeights = 0;
    for (let i = 0; i < arr.length; i++) {
        const currentItem = arr[i];
        const currentWeight = weightGetter(currentItem);
        sumWeights += currentWeight

        if (sumWeights > randWeight) {
            return currentItem;
        }
    }
}

function getZeroFrequencyItemsFromFrequencyMap(frequencyMap: FrequencyMap) {
    return Object.keys(frequencyMap)
        .filter((currentEntry) => {
            return frequencyMap[currentEntry] === 0;
        });
}

function initializeCharacterSourceFrequencyMap(characterSources: CharacterSourceConfig[]) {
    return characterSources
        .map((currentConfig) => {
            return currentConfig.source;
        })
        .reduce((acc, characterSource) => {
            acc[characterSource] = 0;
            return acc;
        }, {});
}

// IMPLEMENTATION =============================================

export function generateRandomPassword(config: RandomPasswordGeneratorConfig): string {
    let resultingPassword: string = '';
    const sourceFrequencyMap = initializeCharacterSourceFrequencyMap(config.characterSources);

    for (let i = 0; i < config.passwordLength; i++) {
        // if we need to include at least one character from each source
        // and we are reaching the end of the string without achieving that goal
        // pick characters from the sources that have not yet been used
        const currentCharacterSources = config.atLeastOnceCharacterPerSourceIfLengthAllows
            && config.passwordLength - i <= getZeroFrequencyItemsFromFrequencyMap(sourceFrequencyMap).length
            ?
            config.characterSources
                .filter((characterSourceConfig) => {
                    return sourceFrequencyMap[characterSourceConfig.source] === 0;
                })
            :
            config.characterSources;

        const currentCharacterSourceConfig = getRandomWeightedValue(
            currentCharacterSources,
            (characterSourceConfig) => {
                return characterSourceConfig.weight
            },
        );
        const currentCharacterSource = currentCharacterSourceConfig.source;
        sourceFrequencyMap[currentCharacterSource]++;
        const currentCharacterSourceValues = CHARACTER_SOURCES[currentCharacterSource];
        const currentCharacter = randomArrayElement(currentCharacterSourceValues);

        resultingPassword += currentCharacter;
    }

    // to avoid having sources with small weights tending to be towards the end of the string
    // due to them being forcefully added at the end if the chance did not naturally occur
    // shuffle the characters around
    return config.atLeastOnceCharacterPerSourceIfLengthAllows ?
        shuffleString(resultingPassword) :
        resultingPassword;
}
