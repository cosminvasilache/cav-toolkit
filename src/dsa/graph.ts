export type TAdjacentNodesGetter<T> = (currentNode: T) => T[];
export type TNodeActionFunction<T> = (currentNode: T) => boolean;

export interface IGraphTraversalParams<T> {
    rootNode: T,
    adjacentNodesGetter: TAdjacentNodesGetter<T>,
    nodeActionFunction: TNodeActionFunction<T>,
}

export function dfs<T>({
    rootNode,
    adjacentNodesGetter,
    nodeActionFunction,
}: IGraphTraversalParams<T>): void {
    const stack: T[] = [];
    const markedSet = new Set<T>();

    stack.push(rootNode);

    while (stack.length > 0) {
        const currentNode = stack.pop() as T;
        const adjacentNodes = adjacentNodesGetter(currentNode);
        const unmarkedAdjacentNodes = adjacentNodes
            .filter((node) => {
                return !markedSet.has(node);
            });

        stack.push(...unmarkedAdjacentNodes.reverse());

        markedSet.add(currentNode);

        const shouldContinueSearching = nodeActionFunction(currentNode);
        if (shouldContinueSearching === false) {
            break;
        }
    }
}


export function bfs<T>({
    rootNode,
    adjacentNodesGetter,
    nodeActionFunction,
}: IGraphTraversalParams<T>): void {
    const queue: T[] = [];
    const markedSet = new Set<T>();

    queue.push(rootNode);

    while (queue.length > 0) {
        const [currentNode] = queue.splice(0, 1);
        const adjacentNodes = adjacentNodesGetter(currentNode);
        const unmarkedAdjacentNodes = adjacentNodes
            .filter((node) => {
                return !markedSet.has(node);
            });

        queue.push(...unmarkedAdjacentNodes); // Stack Overflow error for large arrays

        markedSet.add(currentNode);

        const shouldContinueSearching = nodeActionFunction(currentNode);
        if (shouldContinueSearching === false) {
            break;
        }
    }
}
