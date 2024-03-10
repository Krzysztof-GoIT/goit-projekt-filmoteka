import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '2c31d985c0705d4cec824ff15c12500a';
const AUTHORIZATION =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMxZDk4NWMwNzA1ZDRjZWM4MjRmZjE1YzEyNTAwYSIsInN1YiI6IjY1ZTg0MWVjM2ZlMTYwMDE2MjVjZTAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5HPQhM5yRj3vRPDY3tSFgGEmeCi69HNN3M4_g94gH5c';

let options = {
  headers: {
    accept: 'application/json',
    Authorization: AUTHORIZATION,
  },
};

// Funkcja do pokazywania loadera
function showLoader() {
  // Tutaj dodaj kod do pokazywania loadera na stronie
  console.log('Loader is shown');
}

// Funkcja do ukrywania loadera
function hideLoader() {
  // Tutaj dodaj kod do ukrywania loadera na stronie
  console.log('Loader is hidden');
}

// Funkcja do obsługi żądań asynchronicznych z loaderem
async function handleAsyncRequest(requestFunction) {
  try {
    showLoader(); // Pokaż loader przed rozpoczęciem żądania

    const response = await requestFunction();

    hideLoader(); // Ukryj loader po pomyślnym zakończeniu żądania
    return response;
  } catch (error) {
    console.error('Wystąpił błąd podczas wykonania żądania:', error);

    hideLoader(); // Ukryj loader w przypadku błędu
    throw error;
  }
}

// Genres
export async function fetchGenres() {
  return handleAsyncRequest(async () => {
    const endpointUrl = 'genre/movie/list';
    const searchParams = new URLSearchParams({
      language: 'en',
    });
    const url = new URL(`${BASE_URL}${endpointUrl}?${searchParams}`);
    const response = await axios.get(url, options);
    return response.data;
  });
}

// Posters
async function getPoster(posterUrl) {
  return handleAsyncRequest(async () => {
    options = {
      method: 'GET',
    };
    const url = `POSTERS_URL${posterUrl}`;
    const response = await axios(url, options);
    return response.data;
  });
}

// Trending
export async function fetchTrendingMovies(pageNo) {
  return handleAsyncRequest(async () => {
    const endpointUrl = 'trending/movie/day';
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
      page: pageNo,
    });
    const url = `${BASE_URL}${endpointUrl}?${searchParams}`;
    const response = await axios(url, options);
    return response.data;
  });
}

// Search
export async function fetchSearchMovies(keywords, pageNo) {
  return handleAsyncRequest(async () => {
    const endpointUrl = 'search/movie';
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: keywords,
      include_adult: false,
      language: 'en-US',
      page: pageNo,
    });
    const url = `${BASE_URL}${endpointUrl}?${searchParams}`;
    const response = await axios(url, options);
    return response.data;
  });
}

// Movie Details
export async function fetchMovieDetails(movieId) {
  return handleAsyncRequest(async () => {
    const endpointUrl = 'movie';
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
    });
    const url = `${BASE_URL}${endpointUrl}/${movieId}?${searchParams}`;
    const response = await axios(url, options);
    return response.data;
  });
}

// Movie Trailer
export async function fetchMovieTrailers(movieId) {
  return handleAsyncRequest(async () => {
    const endpointUrl = 'movie';
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      language: 'en-US',
    });
    const url = `${BASE_URL}${endpointUrl}/${movieId}/videos?${searchParams}`;
    const response = await axios(url, options);
    return response.data;
  });
}

// GENRES_LIST
export const genresName = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 10770, name: 'TV Movie' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' },
];
