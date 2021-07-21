import { filterObjectValues } from './object';

const testObj = {
    a: 2,
    b: true,
    c: undefined,
    d: {

    },
    e: undefined,
    f: 'test',
};
const res = filterObjectValues(testObj, (v) => { return v !== undefined });
console.log(res);
