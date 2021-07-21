import { areCoordinatesValid, getCoordinatesFromLinearIndex, getLinearIndexFromCoordinates, IMatrixCoordinates } from './matrix';

export const parseCoordinates = (coordinatesString: string): IMatrixCoordinates => {
    const coordinatesStrings = coordinatesString.split(',');

    // @ts-expect-error
    return coordinatesStrings
        .map((coord) => {
            return parseInt(coord);
        });
}

export const stringifyCoordinates = (coordinates: IMatrixCoordinates): string => {
    return coordinates.join(', ');
}

export const getProxyHander = (numRows: number, numColumns: number): ProxyHandler<any> => {
    return {
        get: (target, propertyKey) => {
            // @ts-expect-error
            const coordinates = parseCoordinates(propertyKey);
            const index = getLinearIndexFromCoordinates(numRows, numColumns)(...coordinates);
            console.log(index);

            return Reflect.get(target, String(index));
        },
        set: (target, propertyKey, value) => {
            // @ts-expect-error
            const coordinates = parseCoordinates(propertyKey);

            if (!areCoordinatesValid(numRows, numColumns)(...coordinates)) {
                return false;
            }

            const index = getLinearIndexFromCoordinates(numRows, numColumns)(...coordinates);

            return Reflect.set(target, String(index), value);
        },
        // TODO: does it make sense?
        // ownKeys: (target) => {
        //     console.log(1);
        //     return Reflect.ownKeys(target)
        //         .map((key) => {
        //             return stringifyCoordinates(
        //                 // @ts-expect-error
        //                 getCoordinatesFromLinearIndex(numRows, numColumns)(parseInt(key, 10))
        //             );
        //         });
        // }
    }
};
