import { objectBfs } from "./object";

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

describe('Object BFS', () => {

    it('should output the correct values', () => {
        const outputArr: any[] = [];
        const expectedResultArr: any[] = [
            obj,
            obj.a,
            obj.x,
            obj.a.b,
            obj.a.c,
            obj.x.y,
            obj.x.z,
            obj.a.b.d,
            obj.a.b.e,
            obj.a.c.f,
        ];

        objectBfs({
            rootObject: obj,
            valueActionFunction: (v) => {
                outputArr.push(v);
                return true;
            }
        })

        expect(outputArr).toEqual(expectedResultArr);
    });

});
