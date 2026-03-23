const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');
const resultsDiv = document.getElementById('results');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

const SWAPI_BASE_URL = 'https://swapi.dev/api/people/';

let currentPage = 1;
let totalPages = 1;
let nextUrl = null;
let prevUrl = null;
let lastSearchTerm = '';

searchBtn.addEventListener('click', searchPeople);

prevBtn.addEventListener('click', () => {
  if (prevUrl) {
    fetchPage(prevUrl);
  }
});

nextBtn.addEventListener('click', () => {
  if (nextUrl) {
    fetchPage(nextUrl);
  }
});

async function handleSearch() {
  const searchTerm = searchInput.value.trim();
  lastSearchTerm = searchTerm;
  currentPage = 1;

  // const searchUrl = `${SWAPI_BASE_URL}?search=${searchTerm}&page=1`;
  const searchUrl = `${SWAPI_BASE_URL}?${new URLSearchParams({ search: searchTerm })}`;
  fetchPage(searchUrl);
}

async function fetchPage(url) {
  showLoading();
  hideError();
  clearResults();

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    handlePaginationData(data);
    displayResults(data.results);
  } catch (error) {
    showError('Failed to fetch data. Please try again.');
    console.error('Error:', error);
  } finally {
    hideLoading();
  }

  // fetch(url)
  //   .then((response) => {
  //     console.log(response);
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     throw Error('Not ok dude!');
  //   })
  //   .then((data) => {
  //     console.log(data);
  //     handlePaginationData(data);
  //     displayResults(data.results);
  //   })
  //   .catch((error) => {
  //     showError('Failed to fetch data. Please try again.');
  //     console.error('Error:', error);
  //   })
  //   .finally(() => {
  //     hideLoading();
  //   });
}

function handlePaginationData(data) {
  nextUrl = data.next;
  prevUrl = data.previous;

  totalPages = Math.ceil(data.count / 10);

  if (data.next) {
    const nextPage = new URL(data.next);
    const nextPageNum = nextPage.searchParams.get('page');
    currentPage = parseInt(nextPageNum) - 1;
  } else if (data.previous) {
    const prevPage = new URL(data.previous);
    const prevPageNum = prevPage.searchParams.get('page');
    currentPage = parseInt(prevPageNum) + 1;
  } else {
    currentPage = 1;
  }

  updatePaginationUI();
}

function updatePaginationUI() {
  pageInfo.textContent = `${currentPage}/${totalPages}`;

  prevBtn.disabled = !prevUrl;
  nextBtn.disabled = !nextUrl;
}

function searchPeople() {
  showLoading();
  hideError();
  clearResults();

  handleSearch();
}

function displayResults(people) {
  if (people.length === 0) {
    resultsDiv.innerHTML =
      '<div class="no-results">No characters found. Try another search!</div>';
    return;
  }

  resultsDiv.innerHTML = people
    .map((person) => createPersonCard(person))
    .join('');
}

function createPersonCard(person) {
  return `
        <div class="person-card">
            <div class="person-name">${person.name}</div>
            <div class="person-details">
                <div class="detail-item">
                    <span class="detail-label">Height:</span>
                    <span>${person.height} cm</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Mass:</span>
                    <span>${person.mass} kg</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Hair Color:</span>
                    <span>${person.hair_color}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Skin Color:</span>
                    <span>${person.skin_color}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Eye Color:</span>
                    <span>${person.eye_color}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Birth Year:</span>
                    <span>${person.birth_year}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Gender:</span>
                    <span>${person.gender}</span>
                </div>
            </div>
        </div>
    `;
}

function showLoading() {
  loadingDiv.style.display = 'block';
  searchBtn.disabled = true;
}

function hideLoading() {
  loadingDiv.style.display = 'none';
  searchBtn.disabled = false;
}

function showError(message) {
  errorDiv.textContent = message;
  errorDiv.style.display = 'block';
}

function hideError() {
  errorDiv.style.display = 'none';
}

function clearResults() {
  resultsDiv.innerHTML = '';
}

searchPeople();
