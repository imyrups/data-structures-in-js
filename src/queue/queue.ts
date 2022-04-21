export class Queue<T> {
    private elements: T[] = [];
    private front: number = 0;
    private rear: number = 0;
    constructor(ele) {
        if(Array.isArray(ele) && ele.length > 0) {
            this.elements=[...ele];
            this.rear = ele.length - 1;
        }
    }

    public peek(): T {
        return this.elements[this.front] || null;
    }

    public enqueue(val: T) {
        this.elements.push(val);
        this.rear++;
    }

    public dequeue(): T {
        if(this.front*2 <this.rear) {
            return this.elements[this.front++];
        }
        const val = this.elements[this.front];
        this.elements = this.elements.slice(this.front);
        return val || null;
    }
}