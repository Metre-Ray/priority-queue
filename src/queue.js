const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() >= this.maxSize) throw new Error('The queue already has a maximum size.');
		this.heap.push(data, priority);
	}

	shift() {
		if (this.size() === 0) throw new Error('Queue is empty.');
		const value = this.heap.pop();
		return value;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		if (this.size() === 0) return true;
		return false;
	}
}

module.exports = PriorityQueue;
