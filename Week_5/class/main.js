function hello() {
  console.log('Hello World!');
}

function hello1() {
  setTimeout(function func() {
    console.log('ala bala');
  }, 0);
}

function onReady() {
  console.log("You're pizza is ready");
}

function goPickUp() {
  console.log('I am going to pickup the pizza');
}

function orderPizza(onReady) {
  setTimeout(() => {
    onReady();
    setTimeout(goPickUp, 3000);
  }, 2000);
}

function hello2() {
  console.log('Hello World!2');
}

// const a = document.createElement('a');
// a.innerText = 'CLICK ME';
// document.body.appendChild(a);

const time = document.createElement('h1');
time.innerText = new Date();
document.body.appendChild(time);

// setInterval(() => {
//   console.log('Setting time');
//   time.innerText = new Date();
// }, 50);

hello2();

orderPizza(onReady);
hello();

function onSuccess() {
  return 'I am succesfull';
}

function onFailure() {
  return 'I am a failure';
}

const myPromise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (2 === 3) {
      reject('Error');
    } else {
      resolve('bar');
    }
  }, 300);
});

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (2 === 3) {
      reject('Error');
    } else {
      resolve(myPromise2);
    }
  }, 300);
});

function promiseFunc1() {
  return Promise.resolve('baaar');
}

function promiseFunc2(value) {
  return new Promise((resolve, reject) => {
    if (value === 'baaar') {
      reject('Big Error');
    }
    resolve('fooo' + value);
  });
}

function promiseFunc3(value) {
  return Promise.resolve('zzzz' + value);
}

console.log(promiseFunc1());

promiseFunc1()
  .then((data) => promiseFunc2(data))
  .then((data) => promiseFunc3(data))
  .then((data) => console.log(data))
  .catch((error) => console.log(error))
  .finally(() => {
    console.log('Finally I am done');
  });

async function getData() {
  try {
    const dataFromFunc1 = await promiseFunc1();
    const dataFromFunc2 = await promiseFunc2(dataFromFunc1);
    const dataFromFunc3 = await promiseFunc3(dataFromFunc2);

    console.log(dataFromFunc3);
  } catch (error) {
    console.log(`Error: ${error}`);
  } finally {
    console.log('Finally I am done');
  }
}

setTimeout(() => {
  console.log('I am new TIMEOUT');
}, 0);
getData();
