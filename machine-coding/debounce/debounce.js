export default function debounce(fn, timer) {
    let timerId = null;
    return (...args) => {
        clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(null, args), timer);
    }
}