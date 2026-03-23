const headerList = document.getElementById('header-list');

headerList.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    activeListItems = document.getElementsByClassName('active-list-item');
    console.log(activeListItems);
    activeListItems[0].classList.remove('active-list-item');
    event.target.classList.add('active-list-item');
  }
});
