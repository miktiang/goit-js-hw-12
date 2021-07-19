import './css/styles.css';
import { optCountries } from './js/optCountries'

var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('.input')

input.addEventListener('input', debounce(optCountries, DEBOUNCE_DELAY)); 