import { Heap } from "./heap";

export class MaxHeap<T> {
    private heap: Heap<T>;
    constructor(arr) {
        this.heap = new Heap(arr, comparator);
    }

    
}
const comparator = (a,b) => {
    return a<b ? 1 : -1;
}