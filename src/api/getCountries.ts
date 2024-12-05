import COUNTRIES_DATA from '../_data/countries.json';

export function getCountries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(COUNTRIES_DATA);
    }, 500);
  });
}
