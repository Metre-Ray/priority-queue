class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (this.left === null) {
			this.left = node;
			node.parent = this;
		}
		else if (this.right === null) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (this.left === node) {
			this.left = null;
			node.parent = null;
		}
		else if (this.right === node) {
			this.right = null;
			node.parent = null;
		}
		else throw new Error('It is not a child of this node.');
	}

	remove() {
		if (this.parent === null) return;
		this.parent.removeChild(this);
	}

	swapWithParent() {
		if (this.parent === null) return;
		// обновить родителя детей
		if (this.left) this.left.parent = this.parent;
		if (this.right) this.right.parent = this.parent;
		// взять прародителя и родителя 
		const temp = this.parent.parent;
		const par = this.parent;
		const r = this.right;
		const l = this.left;
		// обновить детей данного узла и их родителя
		if (par.right === this) {
			this.right = par;
		}
		else {
			this.right = par.right;
			if (this.right) par.right.parent = this;
		}
		if (par.left === this) {
			this.left = par;
		}
		else {
			this.left = par.left;
			if (this.left) par.left.parent = this;
		}
		// обновить детей родителя и др
		par.right = r;
		par.left = l;
		this.parent.parent = this;
		this.parent = temp;
		if (temp && temp.right === par) {
			temp.right = this;
		}
		else if (temp && temp.left === par) {
			temp.left = this;
		}
	}
}

module.exports = Node;
