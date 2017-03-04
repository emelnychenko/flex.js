vm.data = function() {
    query(document).find('script[type="flex/data"]').each(function(element) {
        element = query(element);

        try {
            var data = json(
                'decode', element.text().trim()
            );

            extend(vm.data.shared, data);
        } catch (e) {
        //
        } finally {
            element.remove();
        }
    });
};

vm.data.shared = {};
