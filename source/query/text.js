query.fn.text = function(text) {
    switch (typeof text) {
        case 'undefined':
            return this[0].textContent;
            break;

        default:
            return this.each(function(element) {
                element.textContent = is('object', text) ?
                    json('encode', text) : text;
            });
    }
};
