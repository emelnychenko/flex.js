query.fn.bind = function(event, call) {
    this.each(function(element) {
        element.addEventListener(event, call, false);
    });

    return this;
};
