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
