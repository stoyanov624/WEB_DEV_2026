let x = 10;
let y = '10';

// console.log('THIS WILL EXECUTE');
// const NUMBER = 100;
// NUMBER++;
// console.log(someFunc);

// console.log(number);
// someFunc();

let testing = 10;
let z = parseInt('dsadsa');
let xyz = {};

let user2 = new Number(5);
let user = {
  username: 'Test',
  password: '123',
  test: '',

  test2: function () {
    console.log('I AM A FUNCTION');
  },
};

function createHuman() {
  return {
    kind: 'Human',
  };
}

function createHuman(name) {
  this.name = name;

  return {
    printName: () => {
      console.log(`My name is ${this.name}`);
    },
  };
}

function createCounter(incrementor) {
  let counter = 0;

  return {
    increment: () => {
      counter += incrementor;
    },
    printCounter: () => {
      console.log(`Counter is at ${counter}`);
    },
  };
}

class Human {
  constructor(name, gender = 'Other') {
    this.name = name;
    this.gender = gender;
  }
}

const myHuman1 = new Human('Ivo', 'M');
const myHuman2 = new Human('Tosho');

console.log(myHuman1);
console.log(myHuman2);

const counterByFive = new createCounter(5);
const counterByTwo = new createCounter(2);
counterByFive.increment();
counterByFive.increment();
counterByFive.increment();

counterByFive.printCounter();

// // const clock = document.createElement('h1');

// // const updateTime = () => {
// //   const now = new Date();

// //   clock.innerText = now.toUTCString();
// //   document.body.appendChild(clock);
// // };

// // setInterval(updateTime, 500);

// const form = document.createElement('form');
// document.body.appendChild(form);

// const input = document.createElement('input');
// input.placeholder = 'What to do?';
// form.appendChild(input);

// const button = document.createElement('button');
// button.innerText = 'ADD';
// button.role = 'ADD';
// form.appendChild(button);

// const tasks = document.createElement('ul');
// const removeElement = (el) => {
//   el.remove();
// };

// form.onsubmit = (event) => {
//   if (input.value) {
//     event.preventDefault();
//     const task = document.createElement('li');

//     task.innerText = input.value;
//     // task.onclick = removeElement.bind(null, task);
//     task.addEventListener('click', (e) => {
//       e.target.remove();
//     });
//     tasks.appendChild(task);
//     input.value = '';
//   }
// };

// document.body.appendChild(tasks);

// const createNumGenerator = () => {
//   let num = 1;
//   return {
//     increment: () => {
//       num++;
//     },
//     decremrent: () => {
//       num--;
//     },
//     getNum: () => {
//       return num;
//     },
//   };
// };

// const numGenerator = createNumGenerator();
// console.log(numGenerator.getNum());

// const h2 = document.createElement('h2');
// h2.innerText = 'TEST666';
// h2.id = 'my-h2';
// document.body.appendChild(h2);

// const getFontSizeSetter = (size) => {
//   return function () {
//     console.log(`${size}px`);
//     console.log(document.getElementById('my-h2'));
//     document.querySelector('#my-h2').style.fontSize = `${size}px`;
//   };
// };

// class Car {
//   #name;
//   #model;
//   constructor(name, model) {
//     this.name = name;
//     this.model = model;
//   }

//   printCar() {
//     console.log(this.name + '-' + this.model);
//   }
// }

// Car.prototype.test = function () {
//   console.log('I AM test');
// };

// const toyota = new Car('Toyota', 'Corolla');

// toyota.printCar();
// console.log(toyota.__proto__);
// console.log(toyota.prototype);

// // setTimeout((error) => {
// //   console.log('Waited 5 seconds');
// //   throw 'Test';
// // }, 1000);

// // fetch('test.txt')
// //   .then((res) => res.text())
// //   .then((text) => {
// //     console.log(text);
// //   })
// //   .catch((e) => console.error(e));

// // const myPromise = new Promise((resolve, reject) => {
// //   const number = 3;
// //   if (number === 2) {
// //     resolve();
// //   } else {
// //     reject();
// //   }
// // });

// // myPromise
// //   .then((result) => {
// //     console.log('Success');
// //   })
// //   .catch((error) => {
// //     console.log('Fail');
// //   });

// // fetch('https://pokeapi.co/api/v2/pokemon')
// //   .then((res) => res.json())
// //   .then((data) => console.log(data))
// //   .catch((error) => console.log(error));

// const getPokemons = async () => {
//   const response = await fetch('https://pokeapi.co/api/v2/pokemon');
//   const data = await response.json();

//   return data;
// };

// const pokemons = getPokemons();
// console.log(pokemons);

// const test = () => {
//   return 5;
// };

function HumanTest(name) {
  this.name = name;
  this.talk = () => {
    console.log('I am talking');
  };
}

function SuperHuman(name) {
  HumanTest.call(this, name);
  this.fly = () => {
    console.log('I am flying');
  };
}

let sup = new SuperHuman('test');
console.log(sup.name);
sup.talk();
sup.fly();

const URL = 'https://time.now/developer/api/timezone/Europe/London';

let data;
const dateTimeHeader = document.createElement('h1');

fetch;
// async function getData() {
//   const response = await fetch(URL);
//   data = await response.json();
//   document.body.appendChild(dateTimeHeader);

//   dateTimeHeader.innerText = data.datetime;
// }

// setInterval(getData, 500);
// getData();
console.log(data);
