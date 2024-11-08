const multiply = (a, b) => {
    return a * b;
};

const product = multiply(5, 8);

const { log } = require('console');
// console.log(product);


const fs = require('fs')

// fs.writeFile('./hello.txt', 'Hello Friend', () => {
//     console.log('file created');
    
// })

const validator = require('validator');

console.log(validator.isEmail('foo.com'));

console.log(validator.isUppercase('butter'));

console.log(validator.isUppercase('BUTTER'));

