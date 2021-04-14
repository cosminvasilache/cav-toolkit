import { randomInteger } from "./random";
import { CountMap } from "../utils/utils";

describe('randomInteger()', () => {

    let countMap: CountMap<number>;
    const NUM_ITERATIONS = 1_000_000;

    beforeEach(() => {
       countMap = new CountMap<number>();
    });

    it('should return each integer with the same probability', () => {
        const MAX_INTEGER = 100;

        for (let i = 0; i < NUM_ITERATIONS; i++) {
            countMap.addItem(randomInteger(MAX_INTEGER))
        }

        expect(countMap.areItemsEvenlyDistributed()).toEqual(true);
    });

});
