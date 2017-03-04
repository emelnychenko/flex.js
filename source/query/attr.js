query.fn.attr = function(key, value) {
    switch (typeof value) {
        case 'undefined':
            switch (typeof key) {
                case 'string':
                    return this[0].getAttribute(key);
                    break;

                case 'object':
                    var self = this;

                    iterate(key, function(key, value) {
                        self.each(function(element) {
                            element.setAttribute(key, value);
                        });
                    });
                    break;
            }
            break;

        default:
            this.each(function(element) {
                element.setAttribute(key, value);
            });

            return this;
    }

    return this;
};
