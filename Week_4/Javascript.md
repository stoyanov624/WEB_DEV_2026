# JavaScript От основите до практиката

> Пълно ръководство за начинаещи и напреднали. Обхваща фундаменталните концепции, TypeScript, HTTP заявки, сигурност и файлова структура.

---

## Съдържание

1. [Променливи и типове данни](#1-променливи-и-типове-данни)
2. [Оператори](#2-оператори)
3. [Условия (if / switch)](#3-условия)
4. [Цикли](#4-цикли)
5. [Функции](#5-функции)
6. [Масиви (Arrays)](#6-масиви)
7. [Обекти (Objects)](#7-обекти)
8. [Destructuring, Spread и Rest](#8-destructuring-spread-и-rest)
9. [Template Literals](#9-template-literals)
10. [Модули (import / export)](#10-модули)
11. [DOM манипулация](#11-dom-манипулация)
12. [Събития (Events)](#12-събития)
13. [Асинхронен JavaScript](#13-асинхронен-javascript)
14. [Класове и ООП](#14-класове-и-ооп)
15. [Error Handling](#15-error-handling)
16. [Полезни съвременни методи](#16-полезни-съвременни-методи)
17. [TypeScript — Основи](#17-typescript)
18. [Fetch API](#18-fetch-api)
19. [Axios — Алтернатива на Fetch](#19-axios)
20. [CORS — Cross-Origin Resource Sharing](#20-cors)
21. [CSRF — Cross-Site Request Forgery](#21-csrf)
22. [Файлова структура на фронтенд клиент](#22-файлова-структура)

---

## 1. Променливи и типове данни

### Деклариране на променливи

```js
// var — стар начин, избягвай го (function-scoped, hoisting проблеми)
var name = 'Иван';

// let — за стойности, които ще се променят (block-scoped)
let age = 25;
age = 26; // OK

// const — за стойности, които НЕ се преназначават (block-scoped)
const PI = 3.14159;
// PI = 3; // TypeError: Assignment to constant variable
```

**Правило:** Използвай `const` по подразбиране. Преминавай към `let` само когато стойността трябва да се променя. Никога не използвай `var`.

### Типове данни

JavaScript има **7 примитивни типа** и **1 референтен тип**:

```js
// --- Примитивни типове ---

// String — текст
const greeting = 'Здравей';
const greeting2 = 'Здравей'; // единични кавички — същото
const greeting3 = `Здравей`; // template literal — най-гъвкав

// Number — цяло число и дробно число (един и същ тип)
const integer = 42;
const float = 3.14;
const negative = -10;

// Boolean — true / false
const isActive = true;
const isDeleted = false;

// null — умишлена липса на стойност
const empty = null;

// undefined — стойност, която не е зададена
let notAssigned;
console.log(notAssigned); // undefined

// BigInt — много големи числа
const huge = 9007199254740991n;

// Symbol — уникален идентификатор
const id = Symbol('id');

// --- Референтен тип ---

// Object — масиви, обекти, функции, дати, Map, Set и т.н.
const person = { name: 'Мария', age: 30 };
const colors = ['red', 'green', 'blue'];
```

### Проверка на тип

```js
typeof 'hello'; // "string"
typeof 42; // "number"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object"  ← известен бъг в JS!
typeof {}; // "object"
typeof []; // "object"  ← масивите са обекти

// По-точна проверка за масив:
Array.isArray([1, 2, 3]); // true
```

### Конвертиране на типове

```js
// Към число
Number('42'); // 42
Number('hello'); // NaN (Not a Number)
parseInt('42px'); // 42
parseFloat('3.14'); // 3.14

// Към текст
String(42); // "42"
(42).toString(); // "42"

// Към булев
Boolean(0); // false
Boolean(''); // false
Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false
// Всичко останало е true!
Boolean('hello'); // true
Boolean(42); // true
Boolean([]); // true  ← празен масив е truthy!
Boolean({}); // true  ← празен обект е truthy!
```

---

## 2. Оператори

### Аритметични

```js
5 + 3; // 8
10 - 4; // 6
3 * 7; // 21
15 / 4; // 3.75
15 % 4; // 3    — остатък при деление
2 ** 3; // 8    — степенуване
```

### Сравнение

```js
// == и != правят type coercion (ИЗБЯГВАЙ ги)
5 == '5'; // true  ← опасно!
5 != '5'; // false

// === и !== проверяват И стойност, И тип (ВИНАГИ използвай тези)
5 === '5'; // false ← правилно
5 !== '5'; // true

5 > 3; // true
5 >= 5; // true
3 < 7; // true
3 <= 2; // false
```

### Логически

```js
true && true; // true   — И двете трябва да са true
true && false; // false
true || false; // true   — Поне едно трябва да е true
!true; // false  — обръща стойността

// Short-circuit (къса връзка):
const user = null;
const name = user && user.name; // null (спира при user)
const fallback = null || 'по подразбиране'; // "по подразбиране"

// Nullish coalescing — ??
// Връща дясната стойност САМО ако лявата е null или undefined
const value = 0 ?? 42; // 0   (0 НЕ е null/undefined)
const value2 = null ?? 42; // 42
const value3 = undefined ?? 42; // 42
```

### Optional Chaining — ?.

```js
const user = {
  name: 'Петър',
  address: {
    city: 'София',
  },
};

// Без optional chaining — гърми, ако нещо е undefined
// user.company.name → TypeError!

// С optional chaining — връща undefined вместо грешка
console.log(user.company?.name); // undefined
console.log(user.address?.city); // "София"
```

---

## 3. Условия

### if / else if / else

```js
const score = 85;

if (score >= 90) {
  console.log('Отличен');
} else if (score >= 70) {
  console.log('Добър');
} else if (score >= 50) {
  console.log('Среден');
} else {
  console.log('Слаб');
}
```

### Тернарен оператор

```js
const age = 20;
const status = age >= 18 ? 'пълнолетен' : 'непълнолетен';
console.log(status); // "пълнолетен"
```

### switch

```js
const day = 'понеделник';

switch (day) {
  case 'понеделник':
  case 'вторник':
  case 'сряда':
  case 'четвъртък':
  case 'петък':
    console.log('Работен ден');
    break;
  case 'събота':
  case 'неделя':
    console.log('Уикенд');
    break;
  default:
    console.log('Невалиден ден');
}
```

---

## 4. Цикли

### for

```js
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

### while

```js
let count = 0;
while (count < 3) {
  console.log(count); // 0, 1, 2
  count++;
}
```

### do...while

```js
let num = 0;
do {
  console.log(num); // Изпълнява се поне 1 път
  num++;
} while (num < 3);
```

### for...of — за масиви и итерируеми обекти

```js
const fruits = ['ябълка', 'круша', 'банан'];

for (const fruit of fruits) {
  console.log(fruit);
}
```

### for...in — за ключовете на обект

```js
const person = { name: 'Ана', age: 28, city: 'Пловдив' };

for (const key in person) {
  console.log(`${key}: ${person[key]}`);
}
```

### break и continue

```js
// break — излиза от целия цикъл
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}

// continue — прескача текущата итерация
for (let i = 0; i < 5; i++) {
  if (i === 2) continue;
  console.log(i); // 0, 1, 3, 4
}
```

---

## 5. Функции

### Function Declaration

```js
// Hoisted — може да се извика преди дефиницията
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5
```

### Function Expression

```js
// НЕ е hoisted
const multiply = function (a, b) {
  return a * b;
};

console.log(multiply(4, 5)); // 20
```

### Arrow Function (стрелкова функция)

```js
// Пълен синтаксис
const subtract = (a, b) => {
  return a - b;
};

// Кратък синтаксис — ако е само един израз
const divide = (a, b) => a / b;

// С един параметър — скобите не са задължителни
const double = (n) => n * 2;

// Без параметри — скобите са задължителни
const greet = () => 'Здравей!';
```

### Параметри по подразбиране

```js
function createUser(name, role = 'user') {
  return { name, role };
}

createUser('Иван'); // { name: "Иван", role: "user" }
createUser('Мария', 'admin'); // { name: "Мария", role: "admin" }
```

### Callback функции

```js
function processData(data, callback) {
  const result = data.toUpperCase();
  callback(result);
}

processData('hello', (result) => {
  console.log(result); // "HELLO"
});
```

### Closures (затваряния)

```js
function createCounter() {
  let count = 0; // "затворена" променлива

  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
counter.getCount(); // 1
```

---

## 6. Масиви

### Създаване и достъп

```js
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'два', true, null, { key: 'value' }];

console.log(numbers[0]); // 1 (първи елемент)
console.log(numbers.length); // 5
console.log(numbers.at(-1)); // 5 (последен елемент)
```

### Основни методи за промяна

```js
const arr = [1, 2, 3];

// Добавяне
arr.push(4); // [1, 2, 3, 4]       — в края
arr.unshift(0); // [0, 1, 2, 3, 4]    — в началото

// Премахване
arr.pop(); // [0, 1, 2, 3]       — от края
arr.shift(); // [1, 2, 3]          — от началото

// Изрязване / вмъкване
arr.splice(1, 1); // [1, 3]         — махни 1 елемент от индекс 1
arr.splice(1, 0, 2); // [1, 2, 3]     — вмъкни 2 на индекс 1
```

### Итерация (най-важните методи)

```js
const numbers = [1, 2, 3, 4, 5];

// forEach — обхождане (не връща нов масив)
numbers.forEach((num, index) => {
  console.log(`[${index}]: ${num}`);
});

// map — трансформация (връща НОВ масив)
const doubled = numbers.map((n) => n * 2);
// [2, 4, 6, 8, 10]

// filter — филтриране (връща НОВ масив)
const even = numbers.filter((n) => n % 2 === 0);
// [2, 4]

// find — първият елемент, който отговаря на условието
const found = numbers.find((n) => n > 3);
// 4

// findIndex — индекс на първия съвпадащ елемент
const idx = numbers.findIndex((n) => n > 3);
// 3

// some — има ли ПОНЕ ЕДИН елемент, отговарящ на условието?
numbers.some((n) => n > 4); // true

// every — ВСИЧКИ ли отговарят?
numbers.every((n) => n > 0); // true

// reduce — натрупване на резултат
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15

// includes — съдържа ли елемент?
numbers.includes(3); // true

// sort — сортиране (МУТИРА оригиналния масив!)
const names = ['Яна', 'Ана', 'Борис'];
names.sort(); // ["Ана", "Борис", "Яна"]

// За числа — задължително трябва compare function:
[10, 2, 30, 1].sort((a, b) => a - b); // [1, 2, 10, 30]

// flat — "изглажда" вложени масиви
[1, [2, [3, 4]]].flat(Infinity); // [1, 2, 3, 4]
```

### Chaining (верижно извикване)

```js
const users = [
  { name: 'Ана', age: 17 },
  { name: 'Борис', age: 25 },
  { name: 'Гергана', age: 30 },
  { name: 'Димитър', age: 15 },
];

const adultNames = users
  .filter((u) => u.age >= 18)
  .map((u) => u.name)
  .sort();
// ["Борис", "Гергана"]
```

---

## 7. Обекти

### Създаване и достъп

```js
const person = {
  firstName: 'Петър',
  lastName: 'Иванов',
  age: 30,
  hobbies: ['четене', 'плуване'],
  address: {
    city: 'Варна',
    zip: '9000',
  },
};

// Достъп чрез точка
console.log(person.firstName); // "Петър"
console.log(person.address.city); // "Варна"

// Достъп чрез скоби (dynamic keys)
const key = 'lastName';
console.log(person[key]); // "Иванов"

// Промяна
person.age = 31;

// Добавяне на ново свойство
person.email = 'peter@example.com';

// Изтриване
delete person.email;
```

### Shorthand свойства и методи

```js
const name = 'Иван';
const age = 25;

// Shorthand — когато името на променливата съвпада с ключа
const user = { name, age }; // вместо { name: name, age: age }

// Shorthand методи
const calculator = {
  add(a, b) {
    // вместо add: function(a, b)
    return a + b;
  },
  subtract(a, b) {
    return a - b;
  },
};
```

### Полезни статични методи

```js
const car = { brand: 'Toyota', year: 2020, color: 'синя' };

Object.keys(car); // ["brand", "year", "color"]
Object.values(car); // ["Toyota", 2020, "синя"]
Object.entries(car); // [["brand", "Toyota"], ["year", 2020], ["color", "синя"]]

// Сливане на обекти
const defaults = { theme: 'light', lang: 'bg' };
const userPrefs = { theme: 'dark' };
const settings = Object.assign({}, defaults, userPrefs);
// { theme: "dark", lang: "bg" }

// Или по-чисто със spread:
const settings2 = { ...defaults, ...userPrefs };
```

---

## 8. Destructuring, Spread и Rest

### Object Destructuring

```js
const user = {
  name: 'Мария',
  age: 28,
  city: 'Бургас',
  role: 'developer',
};

// Извличане на свойства в променливи
const { name, age, city } = user;
console.log(name); // "Мария"

// Преименуване
const { name: userName, role: userRole } = user;
console.log(userName); // "Мария"

// Стойности по подразбиране
const { country = 'България' } = user;
console.log(country); // "България"

// Вложен destructuring
const response = {
  data: {
    user: { id: 1, name: 'Тест' },
  },
};
const {
  data: {
    user: { id, name: n },
  },
} = response;
```

### Array Destructuring

```js
const colors = ['червено', 'зелено', 'синьо'];

const [first, second, third] = colors;
console.log(first); // "червено"

// Пропускане на елементи
const [, , blue] = colors;
console.log(blue); // "синьо"

// Размяна на стойности
let a = 1,
  b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
```

### Spread оператор (...)

```js
// Копиране на масив
const original = [1, 2, 3];
const copy = [...original];

// Сливане на масиви
const merged = [...original, 4, 5, ...[6, 7]];
// [1, 2, 3, 4, 5, 6, 7]

// Копиране на обект
const user = { name: 'Иван', age: 25 };
const updated = { ...user, age: 26, email: 'ivan@test.com' };
// { name: "Иван", age: 26, email: "ivan@test.com" }
```

### Rest оператор (...)

```js
// В destructuring — "събира останалите"
const { name, ...rest } = { name: 'Ана', age: 30, city: 'София' };
console.log(rest); // { age: 30, city: "София" }

const [first, ...others] = [1, 2, 3, 4, 5];
console.log(others); // [2, 3, 4, 5]

// В параметри на функция
function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
sum(1, 2, 3, 4); // 10
```

---

## 9. Template Literals

```js
const name = 'Георги';
const age = 32;

// Интерполация — вмъкване на стойности в текст
const message = `Здравей, ${name}! Ти си на ${age} години.`;

// Изрази в ${}
const price = 19.99;
const tax = 0.2;
const total = `Обща цена: ${(price * (1 + tax)).toFixed(2)} лв.`;

// Многоредов текст
const html = `
  <div class="card">
    <h2>${name}</h2>
    <p>Възраст: ${age}</p>
  </div>
`;

// Tagged templates (напреднало)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `<mark>${values[i]}</mark>` : '');
  }, '');
}
const highlighted = highlight`Потребител ${name} е на ${age} години.`;
```

---

## 10. Модули

### Named exports

```js
// utils.js
export const API_URL = 'https://api.example.com';

export function formatDate(date) {
  return new Date(date).toLocaleDateString('bg-BG');
}

export function formatCurrency(amount) {
  return `${amount.toFixed(2)} лв.`;
}
```

```js
// main.js
import { API_URL, formatDate, formatCurrency } from './utils.js';

// Преименуване при import
import { formatDate as fd } from './utils.js';

// Import на всичко
import * as Utils from './utils.js';
Utils.formatDate('2024-01-01');
```

### Default export

```js
// UserService.js
export default class UserService {
  async getAll() {
    /* ... */
  }
  async getById(id) {
    /* ... */
  }
}
```

```js
// main.js — при default export избираш каквото име искаш
import UserService from './UserService.js';
import MyService from './UserService.js'; // също валидно
```

### Комбиниране на named и default

```js
// api.js
export const BASE_URL = 'https://api.example.com';
export default function fetchData(url) {
  /* ... */
}
```

```js
// main.js
import fetchData, { BASE_URL } from './api.js';
```

---

## 11. DOM манипулация

### Селектиране на елементи

```js
// Един елемент
const title = document.getElementById('title');
const card = document.querySelector('.card'); // първият намерен
const btn = document.querySelector('[data-action]');

// Множество елементи (NodeList)
const items = document.querySelectorAll('.item');
items.forEach((item) => console.log(item.textContent));
```

### Промяна на съдържание и стилове

```js
const el = document.querySelector('#output');

// Текстово съдържание
el.textContent = 'Нов текст';

// HTML съдържание
el.innerHTML = '<strong>Получер текст</strong>';

// Стилове
el.style.color = 'red';
el.style.backgroundColor = '#f0f0f0';
el.style.display = 'none';

// CSS класове
el.classList.add('active');
el.classList.remove('hidden');
el.classList.toggle('open');
el.classList.contains('active'); // true
```

### Създаване и добавяне на елементи

```js
// Създаване
const div = document.createElement('div');
div.className = 'notification';
div.textContent = 'Ново известие!';

// Добавяне
document.body.appendChild(div);

// Вмъкване преди определен елемент
const container = document.querySelector('.container');
const reference = document.querySelector('.reference');
container.insertBefore(div, reference);

// Модерен начин
container.append(div); // в края
container.prepend(div); // в началото
reference.before(div); // преди елемента
reference.after(div); // след елемента

// Премахване
div.remove();
```

### Атрибути

```js
const link = document.querySelector('a');

link.getAttribute('href');
link.setAttribute('target', '_blank');
link.removeAttribute('title');

// Data атрибути
// <div data-user-id="42" data-role="admin">
const el = document.querySelector('[data-user-id]');
console.log(el.dataset.userId); // "42"
console.log(el.dataset.role); // "admin"
el.dataset.newProp = 'value'; // добавя data-new-prop="value"
```

---

## 12. Събития

### addEventListener

```js
const btn = document.querySelector('#myBtn');

btn.addEventListener('click', (event) => {
  console.log('Натиснат!');
  console.log(event.target); // елементът, който е кликнат
  console.log(event.currentTarget); // елементът, на който е закачен listener-а
});

// Премахване на event listener (трябва да е ИМЕНУВАНА функция)
function handleClick(e) {
  console.log('Click!');
}
btn.addEventListener('click', handleClick);
btn.removeEventListener('click', handleClick);
```

### Често използвани събития

```js
// Клик
element.addEventListener('click', handler);

// Въвеждане в input
input.addEventListener('input', (e) => {
  console.log(e.target.value); // текущата стойност
});

// Изпращане на форма
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Спира презареждането на страницата!
  const formData = new FormData(form);
  console.log(formData.get('username'));
});

// Клавиатура
document.addEventListener('keydown', (e) => {
  console.log(e.key); // "Enter", "Escape", "a" и т.н.
  console.log(e.code); // "KeyA", "Enter" и т.н.
});

// Зареждане на страницата
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM е готов!');
});

// Скрол
window.addEventListener('scroll', () => {
  console.log(window.scrollY);
});
```

### Event Delegation (делегиране)

```js
// Вместо да слагаш listener на всяко <li>,
// слагаш ЕДИН listener на родителя <ul>
const list = document.querySelector('#taskList');

list.addEventListener('click', (e) => {
  // Проверяваш кой ТОЧНО елемент е кликнат
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('done');
  }

  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('li').remove();
  }
});
```

---

## 13. Асинхронен JavaScript

### Callbacks (стар подход)

```js
function fetchData(url, callback) {
  setTimeout(() => {
    const data = { id: 1, name: 'Тест' };
    callback(null, data);
  }, 1000);
}

fetchData('/api/user', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});

// Проблем: Callback Hell
// getData(url1, (err, data1) => {
//   getMore(data1.id, (err, data2) => {
//     getEvenMore(data2.ref, (err, data3) => {
//       // ... влагане след влагане
//     });
//   });
// });
```

### Promises

```js
// Създаване на Promise
function fetchUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: 'Потребител ' + id });
      } else {
        reject(new Error('Невалидно ID'));
      }
    }, 1000);
  });
}

// Консумиране на Promise
fetchUser(1)
  .then((user) => {
    console.log(user); // { id: 1, name: "Потребител 1" }
    return fetchUser(2); // верижно
  })
  .then((user2) => {
    console.log(user2);
  })
  .catch((error) => {
    console.error('Грешка:', error.message);
  })
  .finally(() => {
    console.log('Приключи (с или без грешка)');
  });

// Паралелно изпълнение
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)]).then(
  ([user1, user2, user3]) => {
    console.log(user1, user2, user3);
  },
);

// Първият спечелил
Promise.race([fetchUser(1), fetchUser(2)]).then((winner) =>
  console.log(winner),
);

// Всички резултати (дори при грешки)
Promise.allSettled([fetchUser(1), fetchUser(-1)]).then((results) => {
  results.forEach((r) => {
    if (r.status === 'fulfilled') console.log(r.value);
    if (r.status === 'rejected') console.log(r.reason);
  });
});
```

### Async / Await (модерен подход)

```js
// async функция ВИНАГИ връща Promise
async function loadUserData(userId) {
  try {
    const user = await fetchUser(userId);
    console.log(user);

    const posts = await fetchPosts(user.id);
    console.log(posts);

    return { user, posts };
  } catch (error) {
    console.error('Грешка:', error.message);
    throw error;
  } finally {
    console.log('Зареждането приключи');
  }
}

// Паралелни заявки с async/await
async function loadDashboard() {
  const [users, posts, comments] = await Promise.all([
    fetchUsers(),
    fetchPosts(),
    fetchComments(),
  ]);

  return { users, posts, comments };
}

// Извикване
loadUserData(1).then((data) => console.log(data));
```

---

## 14. Класове и ООП

```js
class Animal {
  constructor(name, sound) {
    this.name = name;
    this.sound = sound;
  }

  speak() {
    return `${this.name} казва ${this.sound}!`;
  }

  static isDomestic(animal) {
    const domestic = ['куче', 'котка', 'заек'];
    return domestic.includes(animal.name);
  }

  get info() {
    return `${this.name} (${this.sound})`;
  }

  set nickname(value) {
    this._nickname = value;
  }
}

const dog = new Animal('куче', 'бау');
console.log(dog.speak()); // "куче казва бау!"
console.log(Animal.isDomestic(dog)); // true

// Наследяване
class Dog extends Animal {
  constructor(name, breed) {
    super(name, 'бау');
    this.breed = breed;
  }

  fetch(item) {
    return `${this.name} донесе ${item}!`;
  }
}

const rex = new Dog('Рекс', 'Овчарка');
console.log(rex.speak()); // "Рекс казва бау!"
console.log(rex.fetch('топка')); // "Рекс донесе топка!"
console.log(rex instanceof Dog); // true
console.log(rex instanceof Animal); // true
```

### Private полета (#)

```js
class BankAccount {
  #balance = 0;

  constructor(owner, initialBalance) {
    this.owner = owner;
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount <= 0) throw new Error('Невалидна сума');
    this.#balance += amount;
    return this.#balance;
  }

  get balance() {
    return this.#balance;
  }
}

const acc = new BankAccount('Иван', 1000);
acc.deposit(500);
console.log(acc.balance); // 1500
// console.log(acc.#balance); // SyntaxError!
```

---

## 15. Error Handling

### try / catch / finally

```js
function parseJSON(str) {
  try {
    const data = JSON.parse(str);
    return data;
  } catch (error) {
    console.error('Невалиден JSON:', error.message);
    return null;
  } finally {
    console.log('Опитът за парсване приключи');
  }
}

parseJSON('{"name": "Иван"}'); // { name: "Иван" }
parseJSON('невалиден json'); // null
```

### Custom грешки

```js
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

class NotFoundError extends Error {
  constructor(resource, id) {
    super(`${resource} с ID ${id} не е намерен`);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

function validateUser(user) {
  if (!user.name) {
    throw new ValidationError('name', 'Името е задължително');
  }
  if (!user.email?.includes('@')) {
    throw new ValidationError('email', 'Невалиден имейл');
  }
}

try {
  validateUser({ name: '', email: 'test' });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Поле "${error.field}": ${error.message}`);
  } else {
    throw error;
  }
}
```

---

## 16. Полезни съвременни методи

### Map

```js
const userRoles = new Map();

userRoles.set('ivan@test.com', 'admin');
userRoles.set('maria@test.com', 'editor');

console.log(userRoles.get('ivan@test.com')); // "admin"
console.log(userRoles.has('ivan@test.com')); // true
console.log(userRoles.size); // 2

userRoles.forEach((role, email) => {
  console.log(`${email}: ${role}`);
});
```

### Set

```js
const uniqueIds = new Set([1, 2, 3, 2, 1]);
console.log(uniqueIds); // Set {1, 2, 3}

uniqueIds.add(4);
uniqueIds.delete(2);
uniqueIds.has(3); // true

// Премахване на дубликати от масив
const arr = [1, 1, 2, 3, 3, 4];
const unique = [...new Set(arr)]; // [1, 2, 3, 4]
```

### Полезни String методи

```js
const str = '  Здравей, Свят!  ';

str.trim(); // "Здравей, Свят!"
str.trimStart(); // "Здравей, Свят!  "
str.includes('Свят'); // true
str.startsWith('  Здр'); // true
str.endsWith('!  '); // true
str.replace('Свят', 'JS'); // "  Здравей, JS!  "
str.split(', '); // ["  Здравей", "Свят!  "]
'abc'.repeat(3); // "abcabcabc"
'hello'.padStart(10, '.'); // ".....hello"
```

### Deep Clone и JSON

```js
// Shallow copy
const obj = { a: 1, b: { c: 2 } };
const shallow = { ...obj };
shallow.b.c = 99;
console.log(obj.b.c); // 99! — вложеният обект е споделен

// Deep copy — модерен начин
const deep = structuredClone(obj);
deep.b.c = 99;
console.log(obj.b.c); // 2 — оригиналът е непроменен

// JSON
const data = { name: 'Ива', scores: [10, 20, 30] };
const jsonStr = JSON.stringify(data);
const parsed = JSON.parse(jsonStr);
console.log(JSON.stringify(data, null, 2)); // Pretty print
```

### LocalStorage

```js
// Запис
localStorage.setItem('theme', 'dark');
localStorage.setItem('user', JSON.stringify({ name: 'Иван' }));

// Четене
const theme = localStorage.getItem('theme'); // "dark"
const user = JSON.parse(localStorage.getItem('user'));

// Изтриване
localStorage.removeItem('theme');
localStorage.clear(); // изчиства всичко
```

---

## 17. TypeScript

TypeScript е **надстройка на JavaScript**, която добавя **статично типизиране**. Кодът се компилира (transpile) обратно до обикновен JS.

### Инсталация и базова настройка

```bash
# Инсталиране
npm install -D typescript

# Инициализиране на tsconfig.json
npx tsc --init

# Компилиране
npx tsc              # компилира всички .ts файлове
npx tsc --watch      # слуша за промени
```

### Базови типове

```ts
// Примитивни типове
let name: string = 'Иван';
let age: number = 25;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

// Масиви
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ['Ана', 'Борис'];

// Tuple — масив с фиксирана дължина и типове
let pair: [string, number] = ['age', 25];

// Any — изключва проверката на типове (ИЗБЯГВАЙ)
let risky: any = 'текст';
risky = 42; // OK, но губиш смисъла на TS

// Unknown — по-безопасна алтернатива на any
let safe: unknown = 'текст';
// safe.toUpperCase(); // Грешка! Трябва first да провериш типа
if (typeof safe === 'string') {
  safe.toUpperCase(); // OK
}

// void — функция, която не връща стойност
function logMessage(msg: string): void {
  console.log(msg);
}

// never — функция, която никога не свършва
function throwError(msg: string): never {
  throw new Error(msg);
}
```

### Interfaces и Type Aliases

```ts
// Interface — описва формата на обект
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // optional (незадължително)
  readonly createdAt: Date; // не може да се промени след създаване
}

const user: User = {
  id: 1,
  name: 'Мария',
  email: 'maria@test.com',
  createdAt: new Date(),
};

// Разширяване (наследяване)
interface Admin extends User {
  permissions: string[];
}

// Type alias — по-гъвкав
type ID = string | number; // union type

type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// Използване с generic
const response: ApiResponse<User> = {
  data: user,
  status: 200,
  message: 'OK',
};
```

### Типизиране на функции

```ts
// Параметри и return тип
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional и default параметри
function greet(name: string, greeting: string = 'Здравей'): string {
  return `${greeting}, ${name}!`;
}

// Callback тип
function processItems(
  items: string[],
  callback: (item: string, index: number) => void,
): void {
  items.forEach(callback);
}

// Function type alias
type MathOp = (a: number, b: number) => number;
const divide: MathOp = (a, b) => a / b;
```

### Enums

```ts
// Numeric enum
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}

// String enum (предпочитай — по-четим при дебъг)
enum Status {
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Deleted = 'DELETED',
}

function setStatus(status: Status): void {
  console.log(`Статус: ${status}`);
}

setStatus(Status.Active); // "Статус: ACTIVE"

// const enum — по-оптимизиран (inline-ва се при компилация)
const enum Color {
  Red = 'RED',
  Green = 'GREEN',
  Blue = 'BLUE',
}
```

### Generics

```ts
// Generic функция — работи с ВСЯКАКЪВ тип
function wrapInArray<T>(value: T): T[] {
  return [value];
}

wrapInArray<number>(42); // number[]
wrapInArray<string>('hello'); // string[]
wrapInArray(true); // boolean[] — TS "отгатва" типа

// Generic interface
interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T | null>;
  create(item: Omit<T, 'id'>): Promise<T>;
  update(id: number, item: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

// Constraint — ограничаване на generic-а
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find((item) => item.id === id);
}
```

### Utility Types (вградени в TS)

```ts
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

// Partial<T> — всички полета стават optional
type UpdateUser = Partial<User>;

// Pick<T, K> — избира само определени полета
type UserPreview = Pick<User, 'id' | 'name'>;

// Omit<T, K> — изключва определени полета
type UserWithoutPassword = Omit<User, 'password'>;

// Required<T> — всички полета стават задължителни
// Readonly<T> — всички полета стават readonly
// Record<K, V> — обект с ключове от тип K и стойности от тип V

type UserRoles = Record<string, 'admin' | 'user' | 'editor'>;
const roles: UserRoles = {
  'ivan@test.com': 'admin',
  'maria@test.com': 'editor',
};
```

### Union и Intersection Types

```ts
// Union — може да е ЕДНО ОТ
type StringOrNumber = string | number;

function printId(id: StringOrNumber): void {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// Literal types
type Theme = 'light' | 'dark' | 'system';
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Discriminated union (много мощно!)
type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'rectangle'; width: number; height: number }
  | { kind: 'triangle'; base: number; height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'rectangle':
      return shape.width * shape.height;
    case 'triangle':
      return (shape.base * shape.height) / 2;
  }
}

// Intersection — комбинира типове
type Timestamped = { createdAt: Date; updatedAt: Date };
type SoftDeletable = { deletedAt: Date | null };

type FullEntity = User & Timestamped & SoftDeletable;
```

---

## 18. Fetch API

### GET заявка

```js
async function getUsers() {
  try {
    const response = await fetch('https://api.example.com/users');

    // Провери за HTTP грешки (fetch НЕ хвърля при 4xx/5xx!)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const users = await response.json();
    return users;
  } catch (error) {
    console.error('Грешка при зареждане:', error.message);
    throw error;
  }
}
```

### POST заявка

```js
async function createUser(userData) {
  try {
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP ${response.status}`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error('Грешка при създаване:', error.message);
    throw error;
  }
}

// Използване
const user = await createUser({
  name: 'Иван',
  email: 'ivan@test.com',
});
```

### PUT, PATCH, DELETE

```js
// PUT — пълна замяна
async function updateUser(id, userData) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
}

// PATCH — частична промяна
async function patchUser(id, partialData) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partialData),
  });
  return response.json();
}

// DELETE
async function deleteUser(id) {
  const response = await fetch(`https://api.example.com/users/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Грешка при изтриване: ${response.status}`);
  }

  return true;
}
```

### Заявки с query параметри

```js
async function searchUsers(query, page = 1, limit = 10) {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
  });

  const response = await fetch(`https://api.example.com/users?${params}`);
  return response.json();
}
```

### Заявки с авторизация

```js
async function fetchProtectedData() {
  const token = localStorage.getItem('token');

  const response = await fetch('https://api.example.com/protected', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status === 401) {
    window.location.href = '/login';
    return;
  }

  return response.json();
}
```

### Upload на файл

```js
async function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('description', 'Моят файл');

  // ВНИМАНИЕ: НЕ слагай Content-Type header при FormData!
  // Браузърът го слага автоматично с правилния boundary
  const response = await fetch('https://api.example.com/upload', {
    method: 'POST',
    body: formData,
  });

  return response.json();
}
```

### AbortController — отмяна на заявка

```js
async function fetchWithTimeout(url, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
    });
    return await response.json();
  } catch (error) {
    if (error.name === 'AbortError') {
      console.log('Заявката беше отменена (timeout)');
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}
```

### Пълен API сервизен клас с Fetch

```js
class ApiService {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    if (options.body instanceof FormData) {
      delete config.headers['Content-Type'];
    }

    const response = await fetch(url, config);

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    if (response.status === 204) return null;

    return response.json();
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  patch(endpoint, data) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

// Използване
const api = new ApiService('https://api.example.com');

const users = await api.get('/users');
const newUser = await api.post('/users', {
  name: 'Петър',
  email: 'petar@test.com',
});
await api.patch('/users/1', { name: 'Обновено име' });
await api.delete('/users/1');
```

---

## 19. Axios

Axios е популярна HTTP библиотека, която предлага по-удобен API от `fetch`.

### Инсталация

```bash
npm install axios
```

### Защо Axios вместо Fetch?

| Характеристика             | Fetch                | Axios                |
| -------------------------- | -------------------- | -------------------- |
| Вграден в браузъра         | Да                   | Не (трябва install)  |
| Автоматичен JSON parse     | Не (`.json()`)       | Да (`response.data`) |
| Хвърля при HTTP грешки     | Не                   | Да (4xx/5xx)         |
| Interceptors               | Не                   | Да                   |
| Request/Response transform | Ръчно                | Вградено             |
| Timeout                    | Чрез AbortController | Вградена опция       |
| Progress tracking          | Не                   | Да                   |

### Основни заявки

```js
import axios from 'axios';

// GET
const response = await axios.get('https://api.example.com/users');
console.log(response.data); // директно данните (вече JSON)
console.log(response.status); // 200
console.log(response.headers); // response headers

// POST
const newUser = await axios.post('https://api.example.com/users', {
  name: 'Иван',
  email: 'ivan@test.com',
});
// body-то автоматично се stringify-ва!

// PUT
await axios.put('https://api.example.com/users/1', {
  name: 'Обновено име',
  email: 'updated@test.com',
});

// PATCH
await axios.patch('https://api.example.com/users/1', {
  name: 'Само името',
});

// DELETE
await axios.delete('https://api.example.com/users/1');
```

### Axios Instance (инстанция с предварителни настройки)

```js
// api.js — създаваш ВЕДНЪЖ, използваш НАВСЯКЪДЕ
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000, // 10 секунди
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor за заявки — добавя токен автоматично
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor за отговори — централизирано обработване на грешки
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    if (error.response?.status === 403) {
      console.error('Нямате достъп');
    }
    if (error.response?.status >= 500) {
      console.error('Сървърна грешка');
    }
    return Promise.reject(error);
  },
);

export default api;
```

```js
// userService.js — чист и четим
import api from './api.js';

export const userService = {
  getAll: () => api.get('/users'),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  patch: (id, data) => api.patch(`/users/${id}`, data),
  remove: (id) => api.delete(`/users/${id}`),
  search: (query) => api.get('/users', { params: { q: query } }),
};
```

```js
// Използване
import { userService } from './userService.js';

const { data: users } = await userService.getAll();
const { data: user } = await userService.getById(1);
const { data: newUser } = await userService.create({ name: 'Ново' });
```

### Error Handling с Axios

```js
try {
  const { data } = await api.get('/users');
} catch (error) {
  if (error.response) {
    // Сървърът отговори с грешка (4xx, 5xx)
    console.log('Status:', error.response.status);
    console.log('Data:', error.response.data);
  } else if (error.request) {
    // Заявката е изпратена, но НЯМА отговор (мрежа / timeout)
    console.log('Няма отговор от сървъра');
  } else {
    // Нещо друго се обърка
    console.log('Грешка:', error.message);
  }
}
```

---

## 20. CORS

### Какво е CORS?

**CORS (Cross-Origin Resource Sharing)** е механизъм за сигурност, вграден в браузъра. Той **блокира** заявки от един домейн (origin) към друг, ако сървърът не разреши изрично.

### Origin = protocol + domain + port

```
https://example.com:443 ← това е origin

https://example.com     ← СЪЩИЯТ origin (443 е по подразбиране за https)
http://example.com      ← РАЗЛИЧЕН origin (http ≠ https)
https://api.example.com ← РАЗЛИЧЕН origin (поддомейн)
https://example.com:3000 ← РАЗЛИЧЕН origin (порт 3000 ≠ 443)
```

### Кога се задейства CORS?

```
Frontend (localhost:3000) → API (localhost:8080)
    ↑ РАЗЛИЧЕН origin (различен порт) → CORS!

Frontend (myapp.com) → API (api.myapp.com)
    ↑ РАЗЛИЧЕН origin (поддомейн) → CORS!
```

### Как работи?

**За прости заявки** (GET, POST с `Content-Type: application/x-www-form-urlencoded`):

1. Браузърът изпраща заявката с `Origin` header
2. Сървърът отговаря с `Access-Control-Allow-Origin`
3. Ако origin-ът съвпада — браузърът позволява отговора

**За "сложни" заявки** (PUT, DELETE, custom headers, `Content-Type: application/json`):

1. Браузърът **първо** изпраща **preflight** OPTIONS заявка
2. Сървърът отговаря с позволенията
3. Ако е разрешено — изпраща се истинската заявка

### Решение: Настройка на сървъра

Това е **сървърна** настройка. Ето примери:

```js
// Node.js / Express — с cors пакет
import cors from 'cors';

// Разреши ВСИЧКИ origins (само за разработка!)
app.use(cors());

// Продукция — конкретни origins
app.use(
  cors({
    origin: ['https://myapp.com', 'https://www.myapp.com'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);
```

```python
# Python / FastAPI
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://myapp.com"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
```

```csharp
// C# / ASP.NET Core
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("https://myapp.com")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials();
    });
});

app.UseCors("AllowFrontend");
```

### Типична грешка в конзолата

```
Access to fetch at 'https://api.example.com/users'
from origin 'http://localhost:3000' has been blocked by CORS policy:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

Тази грешка означава, че **сървърът** не е настроен да позволи заявки от твоя origin. Решението е **на сървъра**, НЕ на клиента.

### Proxy при разработка (алтернативен подход)

```js
// vite.config.js
export default {
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
```

Сега вместо `fetch("http://localhost:8080/users")`, пишеш `fetch("/api/users")` — Vite проксира заявката и CORS не се задейства.

---

## 21. CSRF

### Какво е CSRF?

**CSRF (Cross-Site Request Forgery)** — атака, при която злонамерен сайт кара браузъра ти да изпрати заявка към друг сайт, **на който вече си логнат**.

### Как работи атаката?

```
1. Ти си логнат в bank.com — браузърът пази session cookie

2. Посещаваш evil.com, който има скрита форма:
   <form action="https://bank.com/transfer" method="POST">
     <input name="to" value="hacker_account" />
     <input name="amount" value="10000" />
   </form>
   <script>document.forms[0].submit();</script>

3. Браузърът автоматично прикачва cookie-то към заявката
   → bank.com мисли, че ТИ си направил заявката
   → Парите се превеждат!
```

### Защити срещу CSRF

#### 1. CSRF Token (най-разпространен)

Сървърът генерира уникален токен за всяка сесия/форма:

```html
<!-- Сървърът включва токена в HTML-а -->
<meta name="csrf-token" content="abc123uniquetoken" />
```

```js
// Клиентът го прочита и го изпраща с всяка заявка
const csrfToken = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

// С fetch
await fetch('/api/transfer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-CSRF-Token': csrfToken,
  },
  body: JSON.stringify({ to: 'friend', amount: 100 }),
});

// С axios — глобално
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
```

#### 2. SameSite Cookies

```
Set-Cookie: session=abc123; SameSite=Strict; Secure; HttpOnly
```

- `SameSite=Strict` — cookie не се изпраща НИКОГА при cross-site заявки
- `SameSite=Lax` — cookie се изпраща само при навигация (GET), не при POST
- `SameSite=None; Secure` — cookie се изпраща винаги (трябва HTTPS)

#### 3. Double Submit Cookie

```js
// Сървърът слага CSRF token като cookie И очаква го в header
const csrfToken = document.cookie
  .split('; ')
  .find((row) => row.startsWith('csrf_token='))
  ?.split('=')[1];

api.interceptors.request.use((config) => {
  if (['post', 'put', 'patch', 'delete'].includes(config.method)) {
    config.headers['X-CSRF-Token'] = csrfToken;
  }
  return config;
});
```

#### 4. CSRF при SPA (Single Page Apps) с JWT

Ако използваш JWT, съхраняван в `localStorage` (а не в cookie), CSRF **не е проблем**, защото `localStorage` не се прикачва автоматично към заявките.

```js
// JWT в localStorage — CSRF безопасно (но уязвимо на XSS!)
const token = localStorage.getItem("token");
headers: { "Authorization": `Bearer ${token}` }

// JWT в HttpOnly cookie — CSRF уязвимо (но безопасно от XSS)
// → нуждае се от CSRF защита
```

**Компромис:** Много SPA-та използват JWT в `localStorage` + защита срещу XSS (санитизация на входа, Content Security Policy).

---

## 22. Файлова структура

### Базова структура за фронтенд проект

```
my-frontend-app/
├── public/                     # Статични файлове (не минават през build)
│   ├── favicon.ico
│   └── robots.txt
│
├── src/                        # Основен код
│   ├── assets/                 # Изображения, шрифтове, SVG-та
│   │   ├── images/
│   │   ├── fonts/
│   │   └── icons/
│   │
│   ├── styles/                 # Глобални стилове
│   │   ├── global.css          # Reset, типография, CSS променливи
│   │   ├── variables.css       # CSS custom properties / цветова палитра
│   │   └── utilities.css       # Помощни класове (.flex, .hidden и т.н.)
│   │
│   ├── components/             # Преизползваеми UI компоненти
│   │   ├── Button/
│   │   │   ├── Button.jsx      # (или .tsx за TypeScript)
│   │   │   ├── Button.css
│   │   │   └── Button.test.js
│   │   ├── Modal/
│   │   ├── Navbar/
│   │   ├── Card/
│   │   └── FormField/
│   │
│   ├── pages/                  # Компоненти за отделни страници/изгледи
│   │   ├── Home/
│   │   │   ├── Home.jsx
│   │   │   └── Home.css
│   │   ├── Login/
│   │   ├── Dashboard/
│   │   ├── UserProfile/
│   │   └── NotFound/
│   │
│   ├── layouts/                # Обвивки за страници (header, footer, sidebar)
│   │   ├── MainLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── services/               # API комуникация (HTTP заявки)
│   │   ├── api.js              # Axios/fetch инстанция (baseURL, interceptors)
│   │   ├── authService.js      # login(), register(), logout()
│   │   ├── userService.js      # getUsers(), getUserById() и т.н.
│   │   └── productService.js
│   │
│   ├── hooks/                  # Custom React hooks (ако е React проект)
│   │   ├── useAuth.js
│   │   ├── useFetch.js
│   │   └── useLocalStorage.js
│   │
│   ├── context/                # React Context / глобално състояние
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   │
│   ├── utils/                  # Помощни функции (чист JS, без UI)
│   │   ├── formatDate.js
│   │   ├── formatCurrency.js
│   │   ├── validators.js       # validateEmail(), validatePassword()
│   │   └── constants.js        # APP_NAME, ROUTES, STATUS_CODES
│   │
│   ├── router/                 # Конфигурация на маршрутите
│   │   └── index.jsx           # Дефиниция на routes
│   │
│   ├── types/                  # TypeScript типове (ако е TS проект)
│   │   ├── user.ts             # interface User, type UserRole и т.н.
│   │   ├── api.ts              # ApiResponse<T>, PaginatedResult<T>
│   │   └── index.ts            # re-export на всички типове
│   │
│   ├── App.jsx                 # Основен компонент
│   ├── main.jsx                # Entry point (render, providers)
│   └── index.css               # Root стилове
│
├── .env                        # Средови променливи (development)
├── .env.production             # Продукционни стойности
├── .gitignore
├── package.json
├── tsconfig.json               # (ако е TypeScript)
├── vite.config.js              # (или webpack.config.js)
└── README.md
```

### Примерно съдържание на ключови файлове

#### `src/services/api.js`

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default api;
```

#### `src/services/userService.js`

```js
import api from './api';

const BASE = '/users';

export const userService = {
  getAll: (params) => api.get(BASE, { params }),
  getById: (id) => api.get(`${BASE}/${id}`),
  create: (data) => api.post(BASE, data),
  update: (id, data) => api.put(`${BASE}/${id}`, data),
  remove: (id) => api.delete(`${BASE}/${id}`),
};
```

#### `src/utils/constants.js`

```js
export const APP_NAME = 'Моето Приложение';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  NOT_FOUND: '*',
};

export const STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};
```

#### `src/utils/validators.js`

```js
export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password) {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
}

export function validateRequired(value) {
  return (
    value !== null && value !== undefined && value.toString().trim() !== ''
  );
}
```

#### `.env`

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Моето Приложение
```

### Принципи на организация

1. **Групиране по feature** — свързаните файлове (компонент, стил, тест) са заедно
2. **services/** — ЦЯЛАТА HTTP комуникация е отделена от UI кода
3. **utils/** — чисти функции без странични ефекти, лесни за тестване
4. **types/** — централизирани TypeScript типове
5. **Никога** не слагай API URL-и директно в компоненти — използвай `.env` и `services/`
6. **Никога** не дублирай логика — извличай в `utils/` или `hooks/`

---

## Бърз справочник

| Тема                | Ключова дума               | Секция   |
| ------------------- | -------------------------- | -------- |
| const vs let        | Променливи                 | §1       |
| === vs ==           | Строго сравнение           | §2       |
| ?. и ??             | Optional chaining, Nullish | §2       |
| map, filter, reduce | Методи на масиви           | §6       |
| Destructuring       | Извличане на стойности     | §8       |
| async / await       | Асинхронен код             | §13      |
| interface / type    | TypeScript типизиране      | §17      |
| Generics            | Параметрични типове        | §17      |
| fetch vs axios      | HTTP заявки                | §18, §19 |
| CORS                | Cross-origin ограничения   | §20      |
| CSRF                | Защита от атаки            | §21      |
| services/           | Файлова организация        | §22      |

---

> **Съвет:** Не се опитвай да научиш всичко наведнъж. Започни с §1–§9 (основи), после §11–§13 (DOM + async), после §17 (TypeScript) и §18–§19 (HTTP). Останалото ще дойде естествено с практиката.
