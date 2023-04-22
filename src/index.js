import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const list = document.querySelector("country-list");
const info = document.querySelector("country-info");

let searchCountryName = '';


