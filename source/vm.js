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
