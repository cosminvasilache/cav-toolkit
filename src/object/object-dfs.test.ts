import { objectDfs } from "./object";

const obj = {
    a: {
        b: {
            d: 1,
            e: 2,
        },
        c: {
            f: 2,
        }
    },
    x: {
        y: 10,
        z: 11,
    },
};

describe('Object DFS', () => {

    it('should output the correct values', () => {
        const outputArr: any[] = [];
        const expectedResultArr: any[] = [
            obj,
            obj.a,
            obj.a.b,
            obj.a.b.d,
            obj.a.b.e,
            obj.a.c,
            obj.a.c.f,
            obj.x,
            obj.x.y,
            obj.x.z,
        ];

        objectDfs({
            rootObject: obj,
            valueActionFunction: (v) => {
                outputArr.push(v);
                return true;
            }
        })

        expect(outputArr).toEqual(expectedResultArr);
    });

});
