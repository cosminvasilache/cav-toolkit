import {generateRandomPassword} from './password-generator';

const generatedRandomPassword = generateRandomPassword({
    passwordLength: 12,
    characterSources: [
        {
            source: "LOWERCASE_LETTERS",
            weight: 7,
        },
        {
            source: "UPPERCASE_LETTERS",
            weight: 2,
        },
        {
            source: "DIGITS",
            weight: 2,
        },
        {
            source: "SAFE_SPECIAL_CHARACTERS",
            weight: 1,
        },
    ],
    atLeastOnceCharacterPerSourceIfLengthAllows: true,
});

console.log(generatedRandomPassword);
console.log(generatedRandomPassword.length);
