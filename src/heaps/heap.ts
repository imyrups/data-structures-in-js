export class Heap<T> {
    private nodes: T[] = [];
    private comparator: Function;
    /**
     * 
     * @param arr Array
     * @param comparator function to compare the Heap property and return 1 if heap invariant is not satisfied
     */
    constructor(arr, comparator) {
        if (Array.isArray(arr) && arr.length > 0) {
            this.nodes = [...arr];
        }
        if (typeof comparator === 'function') {
            this.comparator = comparator;
        }
    }

    insert(value) {
        this.nodes.push(value);
        this.bubbleUp(this.size() - 1);
        return this;
    }

    extractRoot() {
        if (this.isEmpty()) {
            return null;
        }

        const root = this.peekRoot();
        this.nodes[0] = this.nodes[this.size() - 1];
        this.nodes.pop();
        this.bubbleDown(0);

        return root;
    }

    peekRoot() {
        if (this.isEmpty()) {
            return null;
        }
        return this.nodes[0];
    }

    fix() {
        for (let i = 0; i < this.size(); i++) {
            this.bubbleUp(i);
        }
        return this;
    }

    bubbleUp(startIndex) {
        let childIndex = startIndex;
        let parentIndex = Math.floor((childIndex - 1) / 2);

        while (this.checkHeapInvariant(parentIndex, childIndex)) {
            this.swap(parentIndex, childIndex);
            childIndex = parentIndex;
            parentIndex = Math.floor((childIndex - 1) / 2);
        }
    }

    bubbleDown(startIndex) {
        let parentIndex = startIndex;
        let childIndex = this.compareChildren(parentIndex);

        while (this.checkHeapInvariant(parentIndex, childIndex)) {
            this.swap(parentIndex, childIndex);
            parentIndex = childIndex;
            childIndex = this.compareChildren(parentIndex);
        }
    }

    checkHeapInvariant(parentIndex, childIndex) {
        if (parentIndex < 0 || parentIndex >= this.size()) {
            return false;
        }
        if (childIndex < 0 || childIndex >= this.size()) {
            return false;
        }
        return this.comparator(this.nodes[parentIndex], this.nodes[childIndex]) > 0;
    }

    compareChildren(parentIndex) {
        if (!this.hasLeftChild(parentIndex) && !this.hasRightChild(parentIndex)) {
            return -1;
        }
        if (!this.hasLeftChild(parentIndex)) {
            return this.getRightChildIndex(parentIndex);
        }
        if (!this.hasRightChild(parentIndex)) {
            return this.getLeftChildIndex(parentIndex);
        }
        const compare = this.comparator(this.nodes[this.getLeftChildIndex(parentIndex)],
            this.nodes[this.getRightChildIndex(parentIndex)]);
        return compare > 0 ? this.getRightChildIndex(parentIndex) : this.getLeftChildIndex(parentIndex);
    }

    hasLeftChild(parentIndex) {
        const leftChildIndex = (parentIndex * 2) + 1;
        return leftChildIndex < this.size();
    }

    hasRightChild(parentIndex) {
        const rightChildIndex = (parentIndex * 2) + 2;
        return rightChildIndex < this.size();
    }

    getLeftChildIndex(parentIndex) {
        return (parentIndex * 2) + 1;
    }

    getRightChildIndex(parentIndex) {
        return (parentIndex * 2) + 2;
    }

    getLeafStartIndex() {
        return Math.floor(this.size()) + 1;
    }

    size() {
        return this.nodes.length;
    }

    isEmpty() {
        return this.size() === 0;
    }

    swap(parentIndex, childIndex) {
        let temp = this.nodes[parentIndex];
        this.nodes[parentIndex] = this.nodes[childIndex];
        this.nodes[childIndex] = temp;
    }

    static heapify(arr, comparator) {
        if (!Array.isArray(arr)) {
            throw new Error('Heap.heapify expects an array of values');
        }

        if (typeof comparator !== 'function') {
            throw new Error('Heap.heapify expects a compare function');
        }

        return new Heap(arr, comparator).fix()
    }
}