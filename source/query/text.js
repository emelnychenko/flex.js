query.fn.text = function(text) {
    switch (typeof text) {
        case 'string':
            return this.each(function(element) {
                element.textContent = text;
            });
            break;

        default:
            return this[0].textContent;
    }
};
