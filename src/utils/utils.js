import moment from 'moment';

// Data no formato BR
function dateBrFormat(date) {
  if (date) {
    return moment(date).format('DD/MM/YYYY');
  }

  return '';
}

function dateUsFormat(date) {
  if (date) {
    return moment(date).format('YYYY-MM-DD');
  }

  return '';
}

// Formato de moeda em Us
function moneyUsFormat(value) {
  return parseFloat(value)
    .toFixed(2)
    .replace(',', '.');
}

// Formato de moeda em Br
function moneyBrFormat(value) {
  return parseFloat(value)
    .toFixed(2)
    .replace('.', ',');
}

function moneyBrMask(value = '') {
  return value.replace('.', ',');
}

export { dateBrFormat };
export { moneyUsFormat };
export { moneyBrFormat };
export { moneyBrMask };
export { dateUsFormat };
