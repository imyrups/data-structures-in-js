import { ListNode } from "../shared/list-node";

export class LinkedList<T> {
    private _head: ListNode<T> = null;
    private _size: number = 0;
    constructor(node?: ListNode<T>) {
        if(node && node instanceof ListNode) {
            this.head = node;
            this._size = 1;
        }
    }
    public get head() {
        return this._head;
    }
    public set head(node: ListNode<T>) {
        this._head = node;
    }
    public get size() {
        return this.size;
    }
}