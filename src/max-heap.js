const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.hsize = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.hsize += 1;
	}

	pop() {
		if (!this.root) return;
		const root = this.detachRoot();
		this.restoreRootFromLastInsertedNode(root);
		this.shiftNodeDown(this.root);
		this.hsize -= 1;
		return root.data;
	}

	detachRoot() {
		const root = this.root;
		this.root = null;
		const i = this.parentNodes.indexOf(root);
		if (i !== -1) this.parentNodes.splice(i, 1);
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if (this.parentNodes.length === 0) return;
		const new_root = this.parentNodes.pop();
		this.root = new_root;
		if (new_root !== detached.right && detached.right) new_root.appendChild(detached.right);
		if (new_root !== detached.left && detached.left) new_root.appendChild(detached.left);
		// if (detached.right) detached.right.parent = new_root;
		// if (detached.left) detached.left.parent = new_root;
		// if (!new_root.right || !new_root.left) this.parentNodes.unshift(new_root);
		if (new_root.parent !== detached && new_root.parent !== null && this.parentNodes.indexOf(new_root.parent) === -1) this.parentNodes.unshift(new_root.parent);
		if (!new_root.right || !new_root.left) this.parentNodes.unshift(new_root);
		new_root.remove();
		return new_root;
	}

	size() {
		return this.hsize;
	}

	isEmpty() {
		if (this.root === null) return true;
		return false;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.hsize = 0;
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
			this.parentNodes.push(node);
		}
		else {
			this.parentNodes[0].appendChild(node);
			this.parentNodes.push(node);
			if (this.parentNodes[0].left && this.parentNodes[0].right) this.parentNodes.shift();
		}
	}

	shiftNodeUp(node) {
		if (!node.parent) return;
		if (node.priority <= node.parent.priority) return;
		let childNodesPresent = node.right && node.left;
		let pchildNodesPresent = node.parent.right && node.parent.left;
		if (node.parent === this.root) this.root = node;
		if (!childNodesPresent && !pchildNodesPresent) {
			const i = this.parentNodes.indexOf(node);
			const j = this.parentNodes.indexOf(node.parent);
			this.parentNodes[i] = node.parent;
			this.parentNodes[j] = node;
		}
		else if (!childNodesPresent && pchildNodesPresent) {
			const i = this.parentNodes.indexOf(node);
			if (i !== -1) this.parentNodes[i] = node.parent;
		}
		node.swapWithParent();
		this.shiftNodeUp(node);
	}

	shiftNodeDown(node) { //...parentNodes
		let child;
		if (!node || (!node.right && !node.left)) return;
		
		if (!node.right) {
			child = node.left;
			if (node.left.priority < node.priority) return;
			// node.left.swapWithParent();
		}
		else if (!node.left) {
			child = node.right;
			if (node.right.priority < node.priority) return;
			// node.right.swapWithParent();
		}
		else if (node.priority > node.left.priority && node.priority > node.right.priority) return;
		else if (node.right.priority >= node.left.priority) {
			child = node.right;
			// node.left.swapWithParent();
		}
		else {
			child = node.left;
			// node.right.swapWithParent();
		}

		if (node === this.root) this.root = child;

		const ind1 = this.parentNodes.indexOf(node);
		const ind2 = this.parentNodes.indexOf(child);
		if (ind1 !== -1) this.parentNodes[ind1] = child;
		if (ind2 !== -1) this.parentNodes[ind2] = node;

		child.swapWithParent();
		this.shiftNodeDown(node);
	}
}

module.exports = MaxHeap;
