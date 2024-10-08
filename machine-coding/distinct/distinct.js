export default function distinct(cb, resolvedFn) {
    let lastValue;
    return (value) => {
        let v = resolvedFn ? resolvedFn(value) : value;
        if (v === lastValue) return;

        cb.call(null, value);
        lastValue = value;
    }
}