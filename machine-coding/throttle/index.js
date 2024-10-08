import throttle from "./throttle.js";

const obj = {
    message: 'Hello',
    greet: function (time) {
        console.log(this.message, time);
    },
};

const WAIT = 200;

const throttledFn = throttle(obj.greet, WAIT, { includeTrailing: true });

let nums = [];
for (let i = 0; i < 10; i++){
    let num = Math.ceil(Math.random() * 1000);
    nums.push(num);
    setTimeout(() => throttledFn.call(obj, num), num);
}
const sortedNums = nums.sort();
console.log({ sortedNums , WAIT });
