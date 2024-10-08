import debounce from "./debounce";

const debouncedFn = debounce(console.log, 500);

setTimeout(()=>debouncedFn('100'), 100);
setTimeout(()=>debouncedFn('200'), 100);
setTimeout(()=>debouncedFn('700'), 700);
setTimeout(()=>debouncedFn('1000'), 1000);