query.fn.value = function(value) {
    switch (typeof value) {
        case 'string':
            this.each(function(element) {
                element.value = value;
            });
            break;

        default:
            return this[0].value;
    }

    return this;
};

query.fn.val = query.fn.value;
