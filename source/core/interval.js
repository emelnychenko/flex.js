function interval(call, time) {
    return setInterval(call, time);
}

interval.cancel = function(promise) {
    return clearInterval(promise);
}

flex.interval = interval;
