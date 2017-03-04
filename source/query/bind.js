query.fn.bind = function(action, call) {
    action = action.split(' ');

    this.each(function(element) {
        iterate(action, function(action) {
            element.addEventListener(action, call, false);
        });
    });

    return this;
};
