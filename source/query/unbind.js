query.fn.unbind = function(action, call) {
    action = action.split(' ');

    this.each(function(element) {
        iterate(action, function(action) {
            element.removeEventListener(action, call, false);
        });
    });

    return this;
};
