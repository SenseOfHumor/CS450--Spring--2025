let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 25,
    greet: function () {
        console.log('Hello, my name is ' + this.firstName + ' ' + this.lastName);
    }
};

person.greet(); // Hello, my name is John Doe
console.log(person.firstName); // John

let jsonString = '{"firstName":"John","lastName":"Doe","age":25}';
let person2 = JSON.parse(jsonString);
// Using stringify
console.log(JSON.stringify(person2)); // {"firstName":"John","lastName":"Doe","age":25}

// Callback functions
const my_func = (parameter1, parameter2) => {
    return parameter1*parameter2;
};

// or
(param1, param2) => param1*param2;

console.log(my_func(5, 10)); // 50

// Map
let my_array = [1, 2, 3, 4, 5];
let new_array = my_array.map((element) => element*2);
console.log(new_array); // [2, 4, 6, 8, 10]

// Filter
let my_array1 = [1, 2, 3, 4, 5];
my_array1 = my_array1.filter((element) => element%2 === 0);
console.log(my_array1); // [2, 4]

// Sort
let my_array2 = [5, 2, 3, 4, 1];
my_array2.sort((a, b) => a-b);
console.log(my_array2); // [1, 2, 3, 4, 5]

// Quiz on Tewmplate Literals, map, filter, sort, html flexbox and the padding model (css box model), css -> no code, destructuring assignment
// arrow function, spread operator, `` (backtick)

// Destructuring
let person3 = {
    name: 'John',
    age: 25,
    hobbies: ['reading', 'travelling']
};

let {name, age, hobbies} = person3;
console.log(name); // John
console.log(age); // 25
console.log(hobbies); // ['reading', 'travelling']

// importing from the mjs file
// import {square, PI} from "./utils.mjs";
import {PI} from "./utils.mjs";
// console.log(square(500)); // 25
console.log(PI); // 3.14159

// importing the default export
import NJIT from "./utils.mjs";
console.log(NJIT(500)); // 25
