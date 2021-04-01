
export type TObjectKey = string | number; // TODO there should be a built in type

export type TGenericObject = {
    [key in TObjectKey]: unknown;
};
export interface ISafeSetValueOptions {
    createPath?: boolean, // if it should create the path if it does not already exist
    overridePath?: boolean, // if the values encountered along the path are not objects, in order to accomodate traversal, replace them with empty objects
    overrideValue?: boolean, // if a value already exists at the specified path
}

/**
 * Assigns the value at the given path inside the object.
 * If the path does not exist, it creates objects along the way.
 * If values along the path exist and are not objects, replaces them with objects.
 * If the terminal value exists, overrides it.
 */
export function safeSetValue(
    object: TGenericObject,
    path: TObjectKey[],
    value: unknown,
    options?: ISafeSetValueOptions,
): boolean {
    if (path.length === 0) {
        return false;
    }

    let { createPath, overridePath, overrideValue }: ISafeSetValueOptions = {
        createPath: true,
        overridePath: true,
        overrideValue: true,

        ...options,
    };

    let currentPosition = object;
    let currentKey;

    for (let i = 0; i < path.length - 1; i++) {
        currentKey = path[i];

        if (currentPosition[currentKey] === undefined) {
            if (createPath) {
                const newObject = {};
                currentPosition[currentKey] = newObject;
                currentPosition = newObject;
            } else {
                return false;
            }
        } else if (typeof currentPosition[currentKey] === 'object') {
            currentPosition = currentPosition[currentKey] as TGenericObject;
        } else if (overridePath) {
            createPath = true; // if you already replaced a value along the path with an empty object, create the entire path from here onward
            const newObject = {};
            currentPosition[currentKey] = newObject;
            currentPosition = newObject;
        } else {
            return false;
        }
    }

    currentKey = path[path.length - 1];
    console.log(currentKey);
    if (currentPosition[currentKey] === undefined) {
        currentPosition[currentKey] = value;
    } else if (overrideValue === true) {
        currentPosition[currentKey] = value;
    } else {
        return false;
    }

    return true;
}

export function safeGetValue(
    object: TGenericObject,
    path: TObjectKey[],
) {
    let currentPosition = object;
    for (let i = 0; i < path.length; i++) {
        const currentKey = path[i];

        if (currentPosition[currentKey] === undefined) {
            return undefined;
        }

        // @ts-expect-error
        currentPosition = currentPosition[currentKey];
    }
    return currentPosition;
}
