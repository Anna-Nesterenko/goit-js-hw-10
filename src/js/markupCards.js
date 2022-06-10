export function createMarkupCard(countries) {
  return countries
    .map(country => {
      const {
        name: { official },
        capital,
        population,
        flags: { svg },
        languages,
      } = country;
      const languagesStr = Object.values(languages).join(',');

      return `<div class="country-info__head"><img src="${svg}" alt="${official}" width=80>
      <p class="country-info__name">${official}</p></div>
        <ul class="country-info__list">
          <li class="country-info__item"><span>Capital: </span>${capital}</li>
          <li class="country-info__item"><span>Population: </span>${population}</li>
          <li class="country-info__item"><span>Languages: </span>${languagesStr}</li>
        </ul>`;
    })
    .join('');
}

export function createMarkupList(countries) {
  return countries
    .map(
      ({ name: { official }, flags: { svg } }) =>
        `<li class="country-list__item" data-item="${official}">
          <img src="${svg}" alt="${official}" width=50 >
          <p class="country-list__name">${official}</p>
        </li>`
    )
    .join('');
}
