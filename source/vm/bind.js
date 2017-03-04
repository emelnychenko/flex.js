vm.bind = function(force) {
    query(document).find('[bind]').each(function(element) {
        element = query(element);

        vm.scope.watch(element.attr('bind'), function(id, old, value) {
            element.text(value);
            return value;
        })
    });
};

vm.bind();
