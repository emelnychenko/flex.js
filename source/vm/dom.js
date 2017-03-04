// var vm;

vm.guid = function (id) {
    var base   = 'abcdefghijklmnopqrstuvwxyz0123456789'.split('');
    var length = base.length, outlet;

	while (id > length - 1) {
		outlet = string(base[Math.fmod(id, length)]) + (outlet ? outlet : '');
		id     = Math.floor(id / length);
	}

	return string(base[id]) + (outlet ? outlet : '');
};

vm.shared.keep = function(node, type) {
    var id = vm.guid(vm.shared.length + 1);

    vm.shared.push(id);

    if (!vm.typeof[type])
        vm.typeof[type] = [];

    vm.typeof[type].push(id);

    vm.origin[id] = query(node).attr('guid', id).clone();

    return id;
};

flex.vm = vm;
