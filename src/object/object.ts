import { bfs, dfs } from "../dsa/graph";

export type TObjectEntries<T> = {
    [P in keyof T]: [P, T[P]];
}[keyof T][];

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

export type TPrimitive = string | number | boolean;
export interface IValueWrapper<T> {
    __value: T,
};

export function wrapValue<T>(value: T): IValueWrapper<T> {
    return {
        __value: value
    };
}

export function unwrapValue<T>(wrappedValue: IValueWrapper<T>): T {
    return wrappedValue.__value;
}

export function wrapPrimitiveValue<T extends TPrimitive>(primitiveValue: T): IValueWrapper<T> {
    return wrapValue(primitiveValue);
}

function _objectAdjacentNodesGetter<T>(wrappedValue: IValueWrapper<T>) {
    const valuesArr = Object.values(unwrapValue(wrappedValue)) as TGenericObject[];
    return valuesArr
        .map(wrapValue);
}

function _objectActionFunction<T>(valueActionFunction: (value: T) => boolean) {
    return function (wrappedValue: IValueWrapper<T>) {
        return valueActionFunction(unwrapValue(wrappedValue));
    }
}
export interface IObjectTraversalParams {
    rootObject: TGenericObject,
    valueActionFunction: (value: unknown) => boolean,
}
export function objectDfs<T>({
    rootObject,
    valueActionFunction,
}: IObjectTraversalParams): void {
    return dfs({
        rootNode: wrapValue(rootObject),
        adjacentNodesGetter: _objectAdjacentNodesGetter,
        nodeActionFunction: _objectActionFunction(valueActionFunction),
    });
}

export function objectBfs({
    rootObject,
    valueActionFunction,
}: IObjectTraversalParams) {
    return bfs({
        rootNode: wrapValue(rootObject),
        adjacentNodesGetter: _objectAdjacentNodesGetter,
        nodeActionFunction: _objectActionFunction(valueActionFunction),
    });
}

export function pickKeysFromObject<T extends TGenericObject, U extends (keyof T)[]>(sourceObject: T, keysToPick: U): Pick<T, U[number]> {
    const newObject = {} as Pick<T, U[number]>;

    for (let i = 0; i < keysToPick.length; i++) {
        const currentKey = keysToPick[i];
        newObject[currentKey] = sourceObject[currentKey];
    }

    return newObject;
}

export function excludeKeysFromObject<T extends TGenericObject, U extends (keyof T)[]>(sourceObject: T, keysToExclude: U): Omit<T, U[number]> {
    const newObject = {} as Omit<T, U[number]>;

    const sourceObjectKeys: (keyof T)[] = Object.keys(sourceObject);
    for (let i = 0; i < sourceObjectKeys.length; i++) {
        const currentKey = sourceObjectKeys[i];
        // linear search, a Set<keyof T> could provide better performance for a large number of keys to exclude
        if (!keysToExclude.includes(currentKey)) {
            // @ts-expect-error
            newObject[currentKey] = sourceObject[currentKey];
        }
    }

    return newObject;
}

export function filterObjectValues<T extends Record<string, unknown>>(obj: T, filterFn: (v: unknown) => boolean): T {
    return (Object.entries(obj) as TObjectEntries<T>)
        .filter(([, value]) => {
            return filterFn(value);
        })
        .reduce((acc, [key, value]) => {
            acc[key] = value
            return acc
        }, {} as T)
}


export function filterObjectUndefinedValues<T extends Record<string, unknown>>(obj:T) {
    return filterObjectValues(obj, (v) => {
        return v !== undefined
    });
}
