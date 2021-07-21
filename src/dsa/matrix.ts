/**
 * TODO:
 * - Make NEIGHBOURS functions more generic, curry an extra neighbours delta index parameter, so the definition of neighbours is more generic.
 *   This allows including or not the current value, or removing diagonals, etc...
 */

export type IRowIndex = number;
export type IColumnIndex = number;
export type IMatrixCoordinates = [IRowIndex, IColumnIndex];

export const isIndexValid = (limit: number) => (index: number) => {
    return 0 <= index && index < limit;
}
export const isRowValid = isIndexValid;
export const isColumnValid = isIndexValid;

export const areCoordinatesValid = (numRows: number, numColumns: number) => (row: number, column: number) => {
    return isRowValid(numRows)(row)
        && isColumnValid(numColumns)(column);
}

export const areEachCoordinatesValid = (numRows: number, numColumns: number) => (row: number, column: number) => {
    return [
        isRowValid(numRows)(row),
        isColumnValid(numColumns)(column),
    ];
}

/**
 * As it is an internal method, meant to be used with neighbour relative indexes,
 * does not treat cases such as negative indexes larger than the limit in absolute value,
 * or more than twice the limit.
 */
const wrapIndex = (limit: number) => (index: number) => {
    if (index < 0) {
        return limit + index;
    }
    if (index >= limit) {
        return index - limit;
    }
    return index;
}

export const wrapCoordinates = (numRows: number, numColumns: number) => {
    const wrapRows$ = wrapIndex(numRows);
    const wrapColumns$ = wrapIndex(numColumns);

    return (row: number, column: number): IMatrixCoordinates => {
        return [wrapRows$(row), wrapColumns$(column)];
    }
}

// VECTOR REPRESETANTATION

export type INineTuple<T> = [
    T, T, T,
    T, T, T,
    T, T, T,
];
export type IVectorMatrix<T> = T[];

const NEIGHBOURS_SELF_INDEX = 4;
const NEIGHBOURS_RELATIVE_INDEXES: INineTuple<IMatrixCoordinates> = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 0], [0, 1],
    [1, -1], [1, 0], [1, 1],
];

export const getNeighboursAbsoluteIndexes = (row: number, column: number): INineTuple<IMatrixCoordinates> => {
    // @ts-ignore
    return NEIGHBOURS_RELATIVE_INDEXES
        .map(([deltaRow, deltaColumn]) => {
            return [row + deltaRow, column + deltaColumn];
        });
}

export const getNeighboursValidatedAbsoluteIndexes = (numRows: number, numColumns: number) => {
    const isRowValid$ = isRowValid(numRows);
    const isColumnValid$ = isColumnValid(numColumns);

    return (row: number, column: number): INineTuple<IMatrixCoordinates | null> => {
        // @ts-ignore
        return getNeighboursAbsoluteIndexes(row, column)
            .map(([absRow, absColumn]) => {
                if (
                    !isRowValid$(absRow) ||
                    !isColumnValid$(absColumn)
                ) {
                    return null;
                }

                return [absRow, absColumn];
            });
    }
}

export const getNeighboursWrappedAbsoluteIndexes = (numRows: number, numColumns: number) => {
    const wrapCoordinates$ = wrapCoordinates(numRows, numColumns);

    return (row: number, column: number) => {
        return getNeighboursAbsoluteIndexes(row, column)
            .map(([absRow, absColumn]) => {
                return wrapCoordinates$(absRow, absColumn);
            });
    }
}

export const getLinearIndexFromCoordinates = (numRows: number, numColumns: number) => (row: number, column: number): number => {
    return row * numColumns + column;
}

export const getCoordinatesFromLinearIndex = (numRows: number, numColumns: number) => (index: number): IMatrixCoordinates | null => {
    if (!isIndexValid(numRows * numColumns)(index)) {
        return null;
    }

    return [
        Math.floor(index / numColumns),
        index % numColumns,
    ];
}

export const getWrappedNeighbourValues = <T>(matrix: IVectorMatrix<T>, numRows: number, numColumns: number) => {
    const getLinearIndex$ = getLinearIndexFromCoordinates(numRows, numColumns);
    const getNeighboursWrappedAbsoluteIndexes$ = getNeighboursWrappedAbsoluteIndexes(numRows, numColumns);

    return (row: number, column: number) => {
        const neighboursWrappedIndexes = getNeighboursWrappedAbsoluteIndexes$(row, column);
        neighboursWrappedIndexes.splice(NEIGHBOURS_SELF_INDEX);

        return neighboursWrappedIndexes
            .map(([absRow, absColumn]) => {
                return matrix[getLinearIndex$(absRow, absColumn)];
            });
    }
}
