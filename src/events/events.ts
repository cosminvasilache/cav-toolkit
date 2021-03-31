import { consolidateArr, IConsolidateArrParams } from "../array/array";

export function getAllEventTypes(eventTarget = window) {
    return Object.keys(eventTarget)
        .filter((keyName) => {
            return keyName.startsWith('on');
        })
        .map((eventType) => {
            return eventType.slice(2);
        });
}

export function createBatchListener(
    eventTarget: EventTarget,
    eventTypeArr: string[], // TODO: proper type
    eventHandler: EventHandlerNonNull, // TODO: better type?
    eventListenerOptions: EventListenerOptions,
) {
    eventTypeArr
        .forEach((eventType) => {
            eventTarget.addEventListener(
                eventType,
                eventHandler,
                eventListenerOptions,
            );
        });

    return () => {
        eventTypeArr
            .forEach((eventType) => {
                eventTarget.removeEventListener(
                    eventType,
                    eventHandler
                );
            });
    };
}

export function createGlobalListener(
    eventHandler: EventHandlerNonNull, // TODO: better type?
    eventListenerOptions: EventListenerOptions,
    filteringCriteria: Omit<IConsolidateArrParams<any>, 'sourceList'> = {},
) {
    const eventTypes = consolidateArr({
        sourceList: getAllEventTypes(window),
        ...filteringCriteria,
    });
    return createBatchListener(
        document,
        eventTypes,
        eventHandler,
        eventListenerOptions,
    );
}
