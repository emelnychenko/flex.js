query.fn.submit = function() {
    this.each(function(element) {
        element.submit();
    });

    return this;
};
