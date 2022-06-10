const API_URL = 'https://restcountries.com/v3.1/name/';
const searchParams = new URLSearchParams({
  fields: 'name,capital,population,flags,languages',
});

export function fetchCountries(name) {
  const url = `${API_URL}${name}?${searchParams}`;
  return fetch(url).then(response => {
    return response.json();
  });
}
