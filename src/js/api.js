import axios from 'axios';

// stałe parametry połączenia z API The Movie Data Base
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '2c31d985c0705d4cec824ff15c12500a';
const AUTHORIZATION =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMxZDk4NWMwNzA1ZDRjZWM4MjRmZjE1YzEyNTAwYSIsInN1YiI6IjY1ZTg0MWVjM2ZlMTYwMDE2MjVjZTAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.5HPQhM5yRj3vRPDY3tSFgGEmeCi69HNN3M4_g94gH5c';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: AUTHORIZATION,
  },
};

// Genres, np. https://api.themoviedb.org/3/genre/movie/list?language=en
// pobieranie listy gatunków filmów
export async function fetchGenres() {
  const endpointUrl = 'genre/movie/list';
  const searchParams = new URLSearchParams({
    language: 'en',
  });
  const url = new URL(`${BASE_URL}${endpointUrl}?${searchParams}`);

  const response = await axios.get(url, options);
  // console.log('response: ', response);
  return response.data;
}

// Posters, np. https://image.tmdb.org/t/p/original/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg
// pobieranie plakatu na podstawie adresu
async function getPoster(posterUrl) {
  const url = `POSTERS_URL${posterUrl}`;
  const response = await axios(url, options);
  return response.data;
}

// Trending, np. https://api.themoviedb.org/3/trending/movie/day?language=en-US
// pobieranie listy popularnych filmów
export async function fetchTrendingMovies(pageNo) {
  const endpointUrl = 'trending/movie/day';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    page: pageNo,
  });
  const url = `${BASE_URL}${endpointUrl}?${searchParams}`;
  const response = await axios(url, options);
  return response.data;
}

// Search, np. https://api.themoviedb.org/3/search/movie?query=avengers&include_adult=false&language=en-US&page=1
// pobieranie listy filmów wyszukanych na podstawie słów kluczowych
export async function fetchSearchMovies(keywords, pageNo) {
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
}

// Movie Details, np. https://api.themoviedb.org/3/movie/12345?language=en-US
// pobieranie szczegółowych informacji o podanym filmie
export async function fetchMovieDetails(movieId) {
  const endpointUrl = 'movie';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });
  const url = `${BASE_URL}${endpointUrl}/${movieId}?${searchParams}`;
  const response = await axios(url, options);
  return response.data;
}

// Movie Trailer, np. 'https://api.themoviedb.org/3/movie/123455/videos?language=en-US
// pobiernie listy trailerów dla podanego filmu
export async function fetchMovieTrailers(movieId) {
  const endpointUrl = 'movie';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });
  const url = `${BASE_URL}${endpointUrl}/${movieId}/videos?${searchParams}`;
  const response = await axios(url, options);
  return response.data;
}

// GENRES_LIST
// zamiast częstego pobierania, gotowa lista gatunków filmów
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
