// const childs = document.querySelectorAll('.child');
// const children = Array.from(document.getElementsByClassName('child'));

// children.forEach((el) => changeColor(el, 'green'));
// changeColor(children[0].parentElement, 'pink');

// function changeColor(element, color) {
//   element.style.backgroundColor = color || 'gray';
// }

// parent.addEventListener(
//   'click',
//   (e) => {
//     if (e.target.className === 'child') {
//       changeColor(e.target);
//     }
//     console.log(e.target.tagName === 'DIV');
//   },
//   { once: true, capture: true },
// );

// const childOne = document.querySelector('.child');
// const parent = document.querySelector('.parent');
// const grandParent = document.querySelector('.grandparent');

// childOne.addEventListener(
//   'click',
//   (e) => {
//     console.log('Buble child');
//     e.stopPropagation();
//   },
//   { capture: false },
// );

// parent.addEventListener(
//   'click',
//   (e) => {
//     console.log('Buble parent');
//   },
//   { capture: false },
// );

// grandParent.addEventListener(
//   'click',
//   () => {
//     console.log('Buble grandParent');
//   },
//   { capture: false },
// );

// element.classList.toggle('barely-visible');
// element.style = 'width: 1000px';

// const grandParent = document.getElementById('grandparent');
// const grandParents = document.getElementsByClassName('grandparent');

// const grandParent = document.querySelector('#grandparent');
// const grandParents = document.querySelectorAll('div');

// grandParents.forEach((el) => console.log(el.tagName));

// const childOne = document.querySelector('#parent').children[0];
// const grandParent = document.getElementById('grandparent');
// const parent = document.getElementById('parent');

// childOne.addEventListener(
//   'click',
//   (e) => {
//     console.log('CHILD BUBBLE');
//     e.stopPropagation();
//   },
//   {
//     capture: false,
//   },
// );

// parent.addEventListener(
//   'click',
//   () => {
//     console.log('PARENT BUBBLE');
//   },
//   {
//     capture: false,
//   },
// );

// grandParent.addEventListener(
//   'click',
//   (e) => {
//     console.log('GRANDPARENT BUBBLE');
//     e.stopPropagation();
//   },
//   {
//     capture: false,
//   },
// );

// EVENT DELEGATION
const element = document.getElementById('child-one');
const parent = document.getElementById('parent');

const child3 = document.createElement('div');
child3.classList.add('child');
child3.innerText = 'Child Three';
parent.append(child3);

parent.addEventListener('click', (e) => {
  if (e.target.classList.contains('child')) {
    e.target.style.backgroundColor = 'gray';
  }
});

// child3.addEventListener('click', (e) => {
//   e.target.style.backgroundColor = 'gray';
// });

// element.addEventListener('click', (e) => {
//   e.target.style.backgroundColor = 'gray';
// });
