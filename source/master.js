window.flex = {};

var
    integer = parseInt,
    float   = parseFloat,
    number  = Number,
    boolean = Boolean,
    string  = String,
    object  = Object
;

function array(value) {
    return Array
        .prototype
        .slice
        .call(value);
}

function is(type, value) {
    switch (type) {
        case 'array':
            return Object
                .prototype
                .toString
                .call(value) === '[object Array]';

        default:
            return is[type] ? is[type](value) : typeof value === type;
    }
}

function iterate(iterator, call, force) {
    switch (typeof iterator) {
        case 'object':
            if (force === 'array' || flex.is('array', iterator) === true) {
                for (var i = 0; i < iterator.length; i++)
                    call ? call(iterator[i], i) : undefined;

                return this;
            } else {
                for (var i in iterator)
                    call ? call(i, iterator[i]) : undefined;
            }

            return this;
    }
}

function extend() {
    var i, k, argv = arguments, argc = argv.length;

    for (i = 1; i < argc; i++)
        for (k in argv[i])
            if (argv[i].hasOwnProperty(k))
                argv[0][k] = argv[i][k];

    return argv[0];
}

function copy(source, destination) {
    switch (destination) {
        case undefined:
            return json(
                'decode', json('encode', source)
            );
            break;

        default:
            source = json(
                'decode', json('encode', destination)
            );

            return this;
    }
}

function facade(self, call, argv) {
    // console.log(call[argv.shift()]);
    return call[argv.shift()].apply(self, argv);
}

function noop() {}

extend(flex, {
    facade  : facade,
    extend  : extend,
    is      : is,
    // to      : to,
    // json    : json,
    copy    : copy,
    // uri     : uri,
    noop    : noop,
    iterate : iterate,
    each    : iterate,
    boolean : boolean,
    bool    : boolean,
    integer : integer,
    int     : integer,
    float   : float,
    double  : float,
    string  : string,
    str     : string,
    array   : array,
    arr     : array,
    object  : object,
    obj     : object,
});
