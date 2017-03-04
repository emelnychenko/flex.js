query.fn.remove = function() {
    this.each(function(element) {
        element.parentElement.removeChild(element);
    })
};
