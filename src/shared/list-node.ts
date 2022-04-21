export class ListNode<T> {
    private _value: T;
    private _next: ListNode<T>;
    constructor(val: T, next: ListNode<T>) {
        this.value = val || null;
        this.next = next || null;
    }
    public get value(): T {
      return this._value;  
    }
    public set value(val: T) {
        this._value = val;
    }
    public get next(): ListNode<T> {
        return this._next;
    }
    public set next(node: ListNode<T>) {
        this._next = node;
    }
    public hasNext() {
        return this._next instanceof ListNode;
    }
}