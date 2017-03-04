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
