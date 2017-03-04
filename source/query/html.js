query.fn.html = function(html) {
    switch (typeof html) {
        case 'string':
            return this.each(function(element) {
                element.innerHTML = html;
            });
            break;

        default:
            return this[0].innerHTML;
    }
};
