query.fn.unbind = function(event, call) {
    this.each(function(element) {
        element.removeEventListener(event, call, false);
    });

    return this;
};
