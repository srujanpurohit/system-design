import throttle from "./throttle.js";

const now = Date.now()
const obj = {
    message: 'Hello',
    greet: function (time) {
        console.log({
            message: this.message,
            triggerTime: time,
            executionTime: Date.now() - now
        });
    },
};

const WAIT = 200;

const throttledFn = throttle(obj.greet, WAIT);

let nums = [];
for (let i = 0; i < 10; i++){
    let num = Math.ceil(Math.random() * 1000);
    nums.push(num);
    setTimeout(() => throttledFn.call(obj, num), num);
}
console.log({ nums: nums.sort((a,b)=>a-b) , WAIT });
