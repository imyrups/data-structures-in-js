export class Stack<T> {
    private elements: T[] = [];
    private top: number = 0;
    constructor(ele) {
        if(Array.isArray(ele) && ele.length > 0) {
            this.elements=[...ele]
            this.top = ele.length - 1;
        }
    }

    public peek(): T {
        return this.elements[this.top] || null;
    }

    public push(val: T) {
        this.elements.push(val);
        this.top++;
    }

    public pop(): T {
        return this.top>=0 ? this.elements[this.top--] : null;
    }

    public isEmpty(): boolean {
        return this.elements.length === 0;
    }

    public size() :number {
        return this.elements.length;
    }
}