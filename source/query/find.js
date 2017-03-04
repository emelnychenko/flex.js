query.fn.find = function(selector) {
    var instanse = query();

    this.each(function(context) {
        instanse.unshift.apply(
            instanse, array(
                query.all(selector, context)
            )
        );
    });

    return instanse;
};
