query.fn.clone = function() {
    var instance = query();

    this.each(function(element) {
        instance.push(
            element.cloneNode(true)
        );
    });

    return instance;
}
