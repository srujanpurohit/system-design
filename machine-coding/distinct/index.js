import distinct from "./distinct.js";

const distFn = distinct(console.log);

distFn(100);
distFn(100);
distFn(200);
distFn(100);