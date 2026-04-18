const BASE_URL = 'http://localhost:3000';

fetch(BASE_URL)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => error);
