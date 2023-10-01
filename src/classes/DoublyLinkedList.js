import Node from './Node';

class DoublyLinkedList{
    constructor() {
        this.head = null;
        this.tail = null;
        this.current = null;
        this.length = 0;
    }

    append(image) {
        const newNode = new Node(image);
        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
            this.current = newNode;
            
        }else{
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }
    next() {
        this.current = this.current.next;
    }
    
    prev() {
        this.current = this.current.prev;
    }

    findImageAndUpdateCurrent(imageId) {
        let curr = this.head;
        if(curr === null){
            return;
        }
        while(curr !== null){
            if(curr.value.id === imageId){
                this.current = curr;
                return;
            }
            curr = curr.next;
        }

        return;
    }

    deleteCurrentImage() {
        
        if(this.head === null){
            return;
        }

        else if(this.current === this.head){
            if(this.head.next === null){
                this.head = null;
                this.tail = null;
                this.current = null;
                return;
            }
            this.head = this.head.next;
            this.head.prev = null;
            this.current = this.head;
            return;
        }

        else if(this.current === this.tail){
            if(this.tail.prev === null){
                this.head = null;
                this.tail = null;
                this.current = null;
                return;
            }
            this.tail = this.tail.prev;
            this.tail.next = null;
            this.current = this.tail;
            return;
        }
        //if the current image is in the middle of the list
        else if(this.current.next !== null && this.current.prev !== null){
            this.current.prev.next = this.current.next;
            this.current.next.prev = this.current.prev;
            this.current = this.current.next;
            return;
        }

        if(this.current.next !== null){
            this.current = this.current.next;
        }else if(this.current.prev !== null){
            this.current = this.current.prev;
        }
        else{
            this.current = null;
        }

        //if the image is not found
        return;
    }

    getCurrent() {
        if(this.current === null){
            return null;
        }
        return this.current.value;
    }

    getCurrentNext() {
        if(this.current.next === null){
            return null;
        }
        return this.current.next;
    }
    getCurrentPrev() {
        return this.current.prev;
    }
    getFirst() {
        return this.head.value;
    }
    getLast() {
        return this.tail.value;
    }

    getList() {
        let curr = this.head;
        const list = [];
        while(curr !== null){
            list.push(curr.value);
            curr = curr.next;
        }
        return list;
    }

    updateValue(imageId, value) {
        let curr = this.head;
        while(curr !== null){
            if(curr.value.id === imageId){
                curr.value = value;
                return;
            }
            curr = curr.next;
        }
    }
}

export default DoublyLinkedList;