import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '2c31d985c0705d4cec824ff15c12500a';
const AUTHORIZATION =
  'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYzMxZDk4NWMwNzA1ZDRjZWM4MjRmZjE1YzEyNT
AwYSIsInN1YiI6IjY1ZTg0MWVjM2ZlMTYwMDE2MjVjZTAzZSIsInNjb3BlcyI6WyJhcGlfcmV
hZCJdLCJ2ZXJzaW9uIjoxfQ.5HPQhM5yRj3vRPDY3tSFgGEmeCi69HNN3M4_g94gH5c';

let options = {
  headers: {
    accept: 'application/json',
    Authorization: AUTHORIZATION,
  },
};

// genres
// https://api.themoviedb.org/3/genre/movie/list?language=en
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

// Posters
// https://image.tmdb.org/t/p/original/hu40Uxp9WtpL34jv3zyWLb5zEVY.jpg
async function getPoster(posterUrl) {
  options = {
    method: 'GET',
  // console.log('getPoster starts...');
  };
  const url = `POSTERS_URL${posterUrl}`;
  const response = await axios(url, options);
  // console.log('response: ', response);
  return response.data;
}

// Trending:
// https://api.themoviedb.org/3/trending/movie/day?language=en-US
export async function fetchTrendingMovies(pageNo) {
  options = {
    method: 'GET',
  };
  // console.log('fetchPopularMovies starts...');
  const endpointUrl = 'trending/movie/day';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
    page: pageNo,
  });
  const url = `${BASE_URL}${endpointUrl}?${searchParams}`;
  const response = await axios(url, options);
  // console.log('response: ', response);
  return response.data;
}

// Search
// https://api.themoviedb.org/3/search/movie?query=avengers&include_adult=false&language=en-US&page=1
export async function fetchSearchMovies(keywords, pageNo) {
  options = {
    method: 'GET',
  };
  // console.log('fetchSearchMovies starts...');
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
  // console.log('response: ', response);
  return response.data;
}

// Movie Details
// https://api.themoviedb.org/3/movie/12345?language=en-US
export async function fetchMovieDetails(movieId) {
  options = {
    method: 'GET',
  };
  // console.log('fetchMovieDetails starts...');
  const endpointUrl = 'movie';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });
  const url = `${BASE_URL}${endpointUrl}/${movieId}?${searchParams}`;
  const response = await axios(url, options);
  // console.log('response: ', response);
  return response.data;
}

// Movie Trailer
// 'https://api.themoviedb.org/3/movie/123455/videos?language=en-US
export async function fetchMovieTrailers(movieId) {
  options = {
    method: 'GET',
  };
  // console.log('fetchMovieDetails starts...');
  const endpointUrl = 'movie';
  const searchParams = new URLSearchParams({
    api_key: API_KEY,
    language: 'en-US',
  });
  const url = `${BASE_URL}${endpointUrl}/${movieId}/videos?${searchParams}`;
  const response = await axios(url, options);
  // console.log('response: ', response);
  return response.data;
}
