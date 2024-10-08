import debounce from "./debounce.js";

const obj = {
    message: 'Hello',
    greet: function (time) {
        console.log(this.message, time);
    },
};

const debouncedFn = debounce(obj.greet, 500);

setTimeout(()=>debouncedFn.call(obj,'100'), 100);
setTimeout(()=>debouncedFn.call(obj,'100'), 100);
setTimeout(()=>debouncedFn.call(obj,'700'), 700);
setTimeout(()=>debouncedFn.call(obj,'1000'), 1000);