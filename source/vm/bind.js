vm.bind = function(force) {
    query(document).find('[bind]').each(function(element) {
        vm.shared.keep(element, 'bind');
    });
};
