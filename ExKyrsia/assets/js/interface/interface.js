class Interface {

    // Exceptions container:
    nodeList = {}

    // Exceptions container:
    exceptions = {}

    constructor(container) {
        this.nodeList.container = container;
        this.nodeList.body = document.querySelectorAll("body")[0];

        
        this.exceptions = {};
    }
}