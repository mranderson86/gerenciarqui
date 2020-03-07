import moment from "moment";

// Data no formato BR
function dateBrFormat(date = "") {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  }

  return "";
}

// Valor no formato de moeda
function moneyUsFormat(value = "") {
  return value.replace(",", ".");
}

export { dateBrFormat };
export { moneyUsFormat };
