export default function throttle(fn,wait, options = { includeTrailing: true}) {
    let lastRun = 0;
    let timerId;
    let timerId2;
    return function (...args) {
        const now = Date.now();
        const remaining = wait - (now - lastRun);

        const context = this;

        if (!lastRun) {
            fn.apply(context, args);
            lastRun = now;
            return;
        }

        clearTimeout(timerId);
        clearTimeout(timerId2);

        timerId = setTimeout(() => {
            if (remaining<=0) {
                fn.apply(context, args);
                lastRun = now;
            } else if (options.includeTrailing) {
                timerId2 = setTimeout(() => {
                    fn.apply(context, args);
                }, wait);
            }
        }, remaining);

    }
}