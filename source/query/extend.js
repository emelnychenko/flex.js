function ctx(context) {
    return context ? context : document;
}

function one(request, context) {
    return ctx(context)
        .querySelector(request);
}

function all(request, context) {
    return ctx(context)
        .querySelectorAll(request);
}

function fragment(context)
{
    return ctx(context)
        .createDocumentFragment();
}

query.by = {
    id : function (name, context) {
        return ctx(context)
            .getElementById(name);
    },
    tag : function(name, context) {
        return ctx(context)
            .getElementsByTagName(name);
    },
    name : function(name, context) {
        return ctx(context)
            .getElementsByName(name);
    }
};

extend(query, {
    ctx     : ctx,
    one     : one,
    all     : all,
    fragment: fragment,
});
