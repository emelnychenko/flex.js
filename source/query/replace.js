query.fn.replace = function(destination) {
    this.each(function(source) {
        source.parentNode.replaceChild(destination, source);
    })
};
