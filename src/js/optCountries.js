import markupOfSingleCountry from '../templates/single-country-markup.hbs'
import markupOfFewCountries from '../templates/few-countries-markup.hbs'
import Notiflix from "notiflix";

const SOURCE = 'https://restcountries.eu/rest/v2/name/';
const PROPERTIES = 'fields=name;capital;population;flag;languages'
const markup = document.querySelector('.country-list')

function optCountries() {
    if (this.value === '') {
        return Notiflix.Notify.failure('Please enter something');
    };
    fetch(`${SOURCE}${this.value}?${PROPERTIES}`)
        .then(response => {
                return response.json()
        })
        .then(country => {
            markup.innerHTML = '';
            if (country.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                throw new Error('Please enter a valid country name!')
            }else if (country.length === 1) {
                country[0].languages = country[0].languages.map(lang => lang.name).join(', ')
                markup.insertAdjacentHTML('beforeend', markupOfSingleCountry(country))
            } else if (country.length > 1 && country.length <= 10) {
                markup.insertAdjacentHTML('beforeend', markupOfFewCountries(country))
            } else {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
                .catch(error => {
                        console.log(error)
                    })
}

export { optCountries }