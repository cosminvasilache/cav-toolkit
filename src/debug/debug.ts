export function blockThread(timeToBlock: number): void {
    const startTime = Date.now();
    while (Date.now() < startTime + timeToBlock) { }
}

export function debugIn(timeout: number) {
    const timeoutHandle = setTimeout(() => {
        debugger;
    }, timeout);
    return () => clearTimeout(timeoutHandle);
}
