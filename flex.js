(function(window, undefined) {
'use strict';
// object.watch
if (!Object.prototype.watch)
    Object.prototype.watch = function (prop, handler) {
        var oldval = this[prop], newval = oldval,
        getter = function () {
            return newval;
        },
        setter = function (val) {
            oldval = newval;
            return newval = handler.call(this, prop, oldval, val);
        };
        if (delete this[prop]) { // can't watch constants
            if (Object.defineProperty) // ECMAScript 5
                Object.defineProperty(this, prop, {
                    get: getter,
                    set: setter,
                    enumerable: true,
                    configurable: true
                });
            else if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) { // legacy
                Object.prototype.__defineGetter__.call(this, prop, getter);
                Object.prototype.__defineSetter__.call(this, prop, setter);
                this.propertyIsEnumerable(prop);
            }
        }
    };

// object.unwatch
if (!Object.prototype.unwatch)
    Object.prototype.unwatch = function (prop) {
        var val = this[prop];
        delete this[prop]; // remove accessors
        this[prop] = val;
    };

window.flex = {};

var
    integer = parseInt,
    float   = parseFloat,
    number  = Number,
    boolean = Boolean,
    string  = String,
    object  = Object;

function array(value) {
    var array = [];
    // 'use strict';
    for (var i = 0; i < value.length; i++) {
        array.push(value[i]);
    }

    return array;
    // return Array
    //     .prototype
    //     .slice
    //     .call(value);
}

function is(type, value) {
    'use strict';
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
    'use strict';
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

function json() {
    return facade(
        this, json, array(arguments)
    );
}

json.encode = JSON.stringify;

json.decode = JSON.parse;

flex.json   = json;

// flex.eval = function(expression) {
//     return eval(expression);
// };

eval.object = function(object, path, call) {
    var argv = path.split('.'), argc = argv.length - 1;

    return argv.reduce(function(object, key, idx, props) {
        if (idx !== argc && !object[key])
            object[key] = {};

        if (idx === argc && call)
            call(object, key, idx, props);

        return object[key];
    }, object);
};

/**
  *  json
  */
function uri() {
    return facade(
        this, uri, array(arguments)
    );
}

uri.encode = encodeURI;

uri.decode = decodeURI;

flex.uri    = uri;

flex.is.node = function(object) {
    if (typeof Node === "object")
        return object instanceof Node;

    return object
        && typeof object === "object"
        && typeof object.nodeType === "number"
        && typeof object.nodeName === "string";
};

flex.is.element = function(object) {
    if (typeof HTMLElement === "object")
        return object instanceof HTMLElement;

    return object
        && typeof object === "object"
        && object !== null
        && object.nodeType === 1
        && typeof object.nodeName === "string";
};

flex.is.dom = function(object) {
    return flex.is('node', object) || flex.is('element', object);
};

function timeout(call, time) {
    return setTimeout(call, time);
}

timeout.cancel = function(promise) {
    return clearTimeout(promise);
}

flex.timeout = timeout;

function interval(call, time) {
    return setInterval(call, time);
}

interval.cancel = function(promise) {
    return clearInterval(promise);
}

flex.interval = interval;

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

query.fn.each = function(call) {
    iterate(this, call, 'array');

    return this;
};

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

query.fn.attr = function(key, value) {
    switch (typeof value) {
        case 'undefined':
            switch (typeof key) {
                case 'string':
                    return this[0].getAttribute(key);
                    break;

                case 'object':
                    var self = this;

                    iterate(key, function(key, value) {
                        self.each(function(element) {
                            element.setAttribute(key, value);
                        });
                    });
                    break;
            }
            break;

        default:
            this.each(function(element) {
                element.setAttribute(key, value);
            });

            return this;
    }

    return this;
};

query.fn.text = function(text) {
    switch (typeof text) {
        case 'undefined':
            return this[0].textContent;
            break;

        default:
            return this.each(function(element) {
                element.textContent = is('object', text) ?
                    json('encode', text) : text;
            });
    }
};

query.fn.get = function(key) {
    return this[key ? key : 0];
};

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

query.fn.first = function() {
    return query(this[0]);
};

query.fn.last = function() {
    return query(this[this.length - 1]);
};

query.fn.blur = function() {
    this.each(function(element) {
        element.blur();
    });

    return this;
};

query.fn.focus = function() {
    this.each(function(element) {
        element.focus();
    });

    return this;
};

query.fn.submit = function() {
    this.each(function(element) {
        element.submit();
    });

    return this;
};

query.fn.click = function() {
    this.each(function(element) {
        element.click();
    });

    return this;
};

query.fn.bind = function(action, call) {
    action = action.split(' ');

    this.each(function(element) {
        iterate(action, function(action) {
            element.addEventListener ?
                element.addEventListener(
                    action, call, false
                ) : element.attachEvent(
                    'on' + action, call
                );
        });
    });

    return this;
};

query.fn.unbind = function(action, call) {
    action = action.split(' ');

    this.each(function(element) {
        iterate(action, function(action) {
            element.removeEventListener(action, call, false);
        });
    });

    return this;
};

query.fn.value = function(value) {
    switch (typeof value) {
        case 'string':
            this.each(function(element) {
                element.value = value;
            });
            break;

        default:
            return this[0].value;
    }

    return this;
};

query.fn.val = query.fn.value;

query.fn.clone = function() {
    var instance = query();

    this.each(function(element) {
        instance.push(
            element.cloneNode(true)
        );
    });

    return instance;
}

query.fn.replace = function(destination) {
    this.each(function(source) {
        source.parentNode.replaceChild(destination, source);
    })
};

query.fn.remove = function() {
    this.each(function(element) {
        element.parentElement.removeChild(element);
    })
};

function vm() {

}

// vm.origin = {};
//
// vm.shared = [];
//
// vm.typeof = {};

vm.scope  = {};

vm.$watch = function(prop, call) {
    if (vm.$watch.pipes[prop] === undefined) {
        vm.$watch.pipes[prop] = [];

        eval.object(vm.scope, prop, function(object, $prop, index, props) {
            if (is('object', object) === false) object = {};

            object.watch($prop, function(id, old, nue) {
                // object[$prop] = nue;

                if (props.length > 1)
                    for (var i = 1; i < props.length; i++) {
                        var $$prop = props.slice(0, i).join('.');

                        timeout(function () {
                            eval.object(vm.scope, $$prop, function(object, $prop) {
                                iterate(vm.$watch.pipes[$prop], function(call) {
                                    call(object[$prop], object[$prop]);
                                });
                            });
                        }, 0);
                    }

                iterate(vm.$watch.pipes[prop], function(call) {
                    call(nue, old);
                });

                return nue;
            });
        });
    }

    vm.$watch.pipes[prop].push(call);
};

vm.$watch.pipes = {};

flex.vm = vm;

vm.bind = function(force) {
    query(document).find('[bind]').each(function(element) {
        element  = query(element);

        var prop = element.attr('bind');

        element.html('&#160');

        vm.$watch(prop, function(value) {
            switch (typeof value) {
                case 'object':
                    element.text(
                        json('encode', value)
                    );
                    break;

                default:
                    value.length ? element.text(
                        value
                    ) : element.html(
                        '&#160'
                    );
            }
        });
    });
};

vm.bind();

vm.model = function(force) {
    query(document).find('[model]').each(function(element) {
        element = query(element);

        var prop = element.attr('model');

        switch (element.attr('type')) {
            case 'text':
            case 'number':
            case 'search':
            case 'url':
            case 'date':
            case 'time':
            case 'month':
            case 'week':
            case 'datetime-local':
            case 'textarea':
            case null:
                vm.$watch(prop, function(value) {
                    if (element.val() !== value)
                        element.val(value);
                });

                eval.object(vm.scope, prop, function(object, prop) {
                    element.bind('keydown blur change', function() {
                        timeout(function() {
                                object[prop] = element.val();
                        }, 0);
                    });
                });
                break;

            case 'select':
            case 'radio':
                vm.$watch(prop, function(value) {
                    if (element.val() !== value)
                        element.val(value);
                });

                eval.object(vm.scope, prop, function(object, prop) {
                    element.bind('change', function() {
                        timeout(function() {
                                object[prop] = element.val();
                        }, 0);
                    });
                });

            case 'checkbox':
                vm.$watch(prop, function(value) {
                    if (element[0].checked !== boolean(value))
                        element[0].checked = boolean(value);
                });

                eval.object(vm.scope, prop, function(object, prop) {
                    element.bind('change', function() {
                        timeout(function() {
                            object[prop] = element.get().checked;
                        }, 0);
                    });
                });
        }
    });
};

vm.model();

vm.each = function(force) {
    query(document).find('[each]').each(function(element) {
        // var id = vm.shared.keep(element, 'each');


        // console.log(element);
        // var expression  = query(element).attr('each');
        //
        // var fragment    = document.createDocumentFragment();
        //
        // var sides = expression.split('in');
        //
        // var destination = eval(sides[1]);
        // var source      = sides[0];
        //
        // iterate(eval(sides[1]), function(val, key) {
        //     fragment.appendChild(
        //         query(element).clone().get()
        //     );
        //     // console.log(
        //     //     query(element).clone()
        //     // );
        // });
        //
        // fragment.name = '#2fk-10s';
        //
        // query(element).replace(fragment);

        // console.log(fragment.name);

        // var i;
        //
        // var iterator = 'for(' + expression + ') { return }'
        //
        // eval(expression);

        // console.log(vm.document);
    });
};

// mv.each.eval = function(key) {
//
// };

// vm.apply = function() {
    // query(document).replace(vm.document);
// };

vm.data = function() {
    query(document).find('script[type="flex/data"]').each(function(element) {
        element = query(element);

        try {
            var data = json(
                'decode', element.text().trim()
            );

            var name = element.attr('name');

            if (name) {
                vm.scope[name] = data;
            } else {
                extend(
                    vm.scope, data
                );
            }
        } catch (e) {
        //
        } finally {
            element.remove();
        }
    });
};

vm.data();
})(window);
