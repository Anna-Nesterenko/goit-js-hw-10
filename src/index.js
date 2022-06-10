import debounce from 'lodash.debounce';
import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import { createMarkupCard, createMarkupList } from './js/markupCards';

const DEBOUNCE_DELAY = 300;

export const refs = {
  searhBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searhBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch({ target: { value } }) {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return;
  }

  fetchCountries(trimmedValue).then(render).catch(errorHandler);
}

function errorHandler(error) {
  Notiflix.Notify.failure('Oops, there is no country with that name');
}

function render(countries) {
  clearMarkup();

  if (countries.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (countries.length > 1) {
    refs.countryList.innerHTML = createMarkupList(countries);
    onCountryListRendered(countries);
  } else {
    refs.countryInfo.innerHTML = createMarkupCard(countries);
  }
}

function onCountryListRendered(countries) {
  const items = document.querySelectorAll('.country-list__item');
  items.forEach(item => item.addEventListener('click', onCountryItem));

  function onCountryItem(e) {
    const { currentTarget } = e;

    const filtered = countries.filter(
      country => country.name.official === currentTarget.dataset.item
    );

    render(filtered);

    items.forEach(item => item.removeEventListener('click', onCountryItem));
  }
}

function clearMarkup() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
