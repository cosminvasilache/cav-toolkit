import { ChainOfResponsibility } from './chain-of-responsibility';

const chain = new ChainOfResponsibility<string | number>();

function stringLogger(str: string) {
    console.log('String', str);
}

function numLogger(num: number) {
    console.log('Number', num);
}

chain.registerHandler({
    canHandle: (item) => {
        return typeof item === 'string';
    },
    // @ts-expect-error
    handler: stringLogger,
    passThrough: true,
});

chain.registerHandler({
    canHandle: (item) => {
        return typeof item === 'number';
    },
    // @ts-expect-error
    handler: numLogger,
    passThrough: true,
});

chain.handleItem(123);
