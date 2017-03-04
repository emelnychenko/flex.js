function init(request, context) {
    switch (typeof request) {
        case 'object':
            if (flex.is('dom', request) === true)
                this.push(request);
            break;

        case 'string':
            this.push.apply(
                this, array(
                    query.all(request, context)
                )
            );
            break;

        default:
            return;
    }
}

function query(request, context) {
    return new init(request, context);
}

query.fn = Array.prototype;

init.prototype = query.fn;

extend(flex, {
    query: query
});
