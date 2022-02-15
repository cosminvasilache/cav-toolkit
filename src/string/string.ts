type ObjectWithStringValues = {
    [key: string]: string;
};

const prefixObjectValueWithKeyValue = (object: ObjectWithStringValues) => {
	Object.entries(object)
		.forEach(([key, value]) => {
			object[key] = `${key}${value}`;
		});
};
const addObjectKeysAndValuesToUpperCase = (object: ObjectWithStringValues) => {
	Object.entries(object)
		.forEach(([key, value]) => {
			const keyToUpperCase = key.toLocaleUpperCase();
			const valueToUpperCase = value.toLocaleUpperCase();
			object[keyToUpperCase] = valueToUpperCase;
		});
};
const surroundObjectValuesWithBraces = (object: ObjectWithStringValues) => {
	Object.entries(object)
		.forEach(([key, value]) => {
			object[key] = `[${value}]`;

		});
};

const accentMap = {
	a: 'àáâãä',
	c: 'ç',
	e: 'èéêë',
	i: 'ìíîï',
	n: 'ñ',
	o: 'òóôõö',
	s: 'š',
	u: 'ùúûü',
	y: 'ýÿ',
	z: 'žž',
};
prefixObjectValueWithKeyValue(accentMap);
addObjectKeysAndValuesToUpperCase(accentMap);
surroundObjectValuesWithBraces(accentMap);

export const createAccentedRegexSearchString = (searchString: string) => {
	Object.entries(accentMap)
		.forEach(([char, accents]) => {
			searchString = searchString.replaceAll(char, accents);
		});
	return searchString;
};
