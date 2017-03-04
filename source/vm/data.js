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
