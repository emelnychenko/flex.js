function timeout(call, time) {
    return setTimeout(call, time);
}

timeout.cancel = function(promise) {
    return clearTimeout(promise);
}

flex.timeout = timeout;
