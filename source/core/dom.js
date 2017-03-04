flex.is.node = function(object) {
    if (typeof Node === "object")
        return object instanceof Node;

    return object
        && typeof object === "object"
        && typeof object.nodeType === "number"
        && typeof object.nodeName === "string";
};

flex.is.element = function(object) {
    if (typeof HTMLElement === "object")
        return object instanceof HTMLElement;

    return object
        && typeof object === "object"
        && object !== null
        && object.nodeType === 1
        && typeof object.nodeName === "string";
};

flex.is.dom = function(object) {
    return flex.is('node', object) || flex.is('element', object);
};
