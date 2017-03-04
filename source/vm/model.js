vm.model = function(force) {
    query(document).find('[model]').each(function(element) {
        element = query(element);

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
                element.bind('keydown blur change', function() {
                    timeout(function() {
                        vm.scope[element.attr('model')] = element.val();
                    }, 0);
                });
                break;

            case 'select':
            case 'radio':
                element.bind('change', function() {
                    timeout(function() {
                        vm.scope[element.attr('model')] = element.val();
                    }, 0);
                });

            case 'checkbox':
                element.bind('change', function() {
                    timeout(function() {
                        vm.scope[element.attr('model')] = element.get().checked;
                    }, 0);
                });
        }

        // setInterval(function() {
        //
        // }, 10);
    });
};

vm.model();
