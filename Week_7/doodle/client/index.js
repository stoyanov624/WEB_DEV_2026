const baseUrl = 'http://localhost:3000';
const itemsUrl = new URL('items', baseUrl);

fetch(itemsUrl)
  .then((response) => response.json())
  .then((data) => console.log(data));

fetch(itemsUrl, {
  method: 'POST',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ test: 'test' }),
})
  .then((response) => response.json())
  .then((data) => console.log(data));
