import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;
const input = document.querySelector("#search-box");
const list = document.querySelector(".country-list");
const info = document.querySelector(".country-info");

// let searchCountryName = '';

input.addEventListener('input', debounce(onCountryInput, DEBOUNCE_DELAY));


function onCountryInput() {
    const name = input.value.trim()

    if (name === '') {
        return (list.innerHTML = ''), (info.innerHTML = ''); 
    }

    fetchCountries(name)
        .then(countries => {
            list.innerHTML = '';
            info.innerHTML = '';
;
            if (countries.length === 1) {
                list.insertAdjacentHTML('beforeend', renderList(countries));
                info.insertAdjacentHTML('beforeend', renderInfo(countries));
            } else if (countries.lenght >= 10) {
                alertTooManyMatches()
            } else {
                list.insertAdjacentHTML('beforeend', renderList(countries));
            }
        })
    .catch(alertWrongName)
}

function renderList(countries) {
    const markup = countries
        .map(({ name, flags }) => {
        return `<li>
              <img  src="${flags.svg}" alt="Flag of ${name.official}" width = 40px height = 40px>
              <h2 >${name.official}</h2>
          </li>`
        }).join('')
    return markup;
}

function renderInfo(countries) {
    const markup = countries
        .map(({ capital, population, languages }) => {
        
            return `<ul >
            <li ><p><b>Capital: </b>${capital}</p></li>
            <li ><p><b>Population: </b>${population}</p></li>
            <li ><p><b>Languages: </b>${Object.values(languages).join(', ')}</p></li>
        </ul>`
        }).join('')
    return markup;
}

function alertWrongName() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

function alertTooManyMatches() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
}