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
