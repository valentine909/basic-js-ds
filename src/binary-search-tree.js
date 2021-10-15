const {NotImplementedError} = require('../extensions/index.js');

const {Node} = require('../extensions/list-tree.js');
const {nyan, min} = require("mocha/lib/reporters");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
    constructor() {
        this.bst = null;
    }

    root() {
        return this.bst
    }

    add(data) {
        let node = new Node(data)
        if (this.bst === null) this.bst = node
        else {
            this.insertNode(this.bst, node)
        }
    }
    insertNode(root, node) {
        if (root.data < node.data) {
            if (root.right === null) root.right = node;
            else this.insertNode(root.right, node)
        } else {
            if (root.left === null) root.left = node;
            else this.insertNode(root.left, node)
        }
    }

    has(data) {
        return Boolean(this.find(data))
    }

    find(data, node = this.bst) {
        if (node === null) return null
        if (node.data === data) return node
        else if (node.data < data) {
            return this.find(data, node.right)
        } else {
            return this.find(data, node.left)
        }
    }

    remove(data) {
        this.bst = this.removeNode(this.bst, data)
    }

    removeNode(root, data) {
        if (root === null) return null
        else if (root.data < data) {
            root.right = this.removeNode(root.right, data)
            return root
        }
        else if (root.data > data) {
            root.left = this.removeNode(root.left, data)
            return root
        }
        else {
            if (root.left === null) return root.right
            else if (root.right === null) return root.left
            else {
                root.data = this.min(root.right)
                root.right = this.removeNode(root.right, root.data)
                return root
            }
        }
    }

    min(node = this.bst) {
        return this.extremum(node, 'left')
    }

    max(node = this.bst) {
        return this.extremum(node, 'right')
    }

    extremum(node, direction) {
        if (node === null) return null
        let current = node
        while (current[direction]) {
            current = current[direction]
        }
        return current.data
    }
}