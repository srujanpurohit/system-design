export default function debounce(fn, timer) {
    let timerId = null;
    return function (...args) {
        let context = this;
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(context, args), timer);
    }
}