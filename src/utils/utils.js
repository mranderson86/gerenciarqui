import moment from "moment";

// Data no formato BR
function dateBrFormat(date = "") {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  }

  return "";
}

// Formato de moeda em Us
function moneyUsFormat(value = "") {
  return value.replace(",", ".");
}

// Formato de moeda em Br
function moneyBrFormat(value = "") {
  return value.replace(".", ",");
}

export { dateBrFormat };
export { moneyUsFormat };
