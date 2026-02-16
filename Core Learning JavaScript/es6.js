const personObject = {name: 'Homer', lastname: 'Simpson', age: 39};
const personArray = ['Homer', 'Marge', 'Lisa'];

// ------------------------------------
// Spread (...) Operator => the operator spreads an array or iterable into individual elements
const personArray2 = [...personArray, 'Bart', 'Meg'];
console.log(personArray2);
// Result: ['Homer', 'Marge', 'Lisa', 'Bart', 'Meg']


// ------------------------------------
// Function Rest Parameter => allows functions to treat an indefinite number of arguments
const sum = (...args) => {
  let sum = 0;
  for (let arg of args) sum += arg;
  return sum;
};
console.log(sum(4, 9, 16, 25, 29, 100, 66, 77)); // returns 326


// ------------------------------------
// Object Destructuring => makes it easy to assign array values and object properties to variables
const {name, lastname} = personObject;


// ------------------------------------
// Array Destructuring => makes it easy to assign array values and object properties to variables
const [person1, person2] = personArray;


// ------------------------------------
// Array entries() => returns an Array Iterator object with key/value pairs
const p = personArray.entries();
for (let x of p)
    console.log(x);
/*Result:
    [0, 'Homer']
    [1, 'Marge']
    [2, 'Lisa'] */


// ------------------------------------
// Array.from() => creates an array from a string
Array.from("ABCDEFG"); 
// Returns ['A', 'B', 'C', 'D', 'E', 'F', 'G']


// ------------------------------------
// Symbol Type => It represents a unique "hidden" identifier that no other code can accidentally access
let id = Symbol('id');
personObject[id] = 140353;
// Now person[id] = 140353, but person.id is still undefined


// ------------------------------------
// Reflect.has() => the in operator as a function
console.log(Reflect.has(personObject, "name")); // returns true


// ------------------------------------
// Math.sign() => returns -1, 0, or 1 (if x is negative, null or positive)
Math.sign(-4); // returns -1
Math.sign(0);  // returns 0
Math.sign(4);  // returns 1


// ------------------------------------
// Number.isInteger() => method returns true if the argument is an integer
Number.isInteger(10);   // returns true
Number.isInteger(10.5); // returns false


// ------------------------------------
// Math.trunc() => returns the integer part of x
Math.trunc(4.9);  // returns 4
Math.trunc(-4.2); // returns -4


// ------------------------------------
// Math.cbrt() => returns the cube root of x
Math.cbrt(8);  // returns 2
Math.cbrt(64); // returns 4