import hashObject from 'hash-object';

const a = { a: 200, b: undefined };
const b = { a: 200, b: null };

const hashA = hashObject(a);
const hashB = hashObject(b);
console.log('🚀 ~ hashB:', hashA === hashB);
