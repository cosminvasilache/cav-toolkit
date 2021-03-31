
export interface ISafeSetValueOptions {
    createPath?: boolean,
    overridePath?: boolean,
    overrideValue?: boolean,
}

const SAFE_SET_VALUE_DEFAULT_OPTIONS: ISafeSetValueOptions = {
    createPath: true,
    overridePath: true,
    overrideValue: true,
};

/**
 * Assigns the value at the given path inside the object.
 * If the path does not exist, it creates objects along the way.
 * If values along the path exist and are not objects, replaces them with objects.
 * If the terminal value exists, overrides it.
 */
export function safeSetValue(
    object: Object,
    path: string[],
    value: unknown,
    options?: ISafeSetValueOptions,
): void {
    options = {
        ...SAFE_SET_VALUE_DEFAULT_OPTIONS,
        ...options,
    };
    // TODO: implement

}
