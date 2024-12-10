// import { convert } from 'currency-in-words'

const rupeesInWord = require('rupeesinword');

const abcd = 375000;
const options = { lang: 'Hindi', outputCase: 'Title' };
const word = rupeesInWord(abcd, options);
console.log(word);