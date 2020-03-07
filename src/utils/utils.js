import moment from "moment";

// Data no formato BR
function dateBrFormat(date = "") {
  if (date) {
    return moment(date).format("DD/MM/YYYY");
  }

  return "";
}

// Formato de moeda em Us
function moneyUsFormat(value) {
  return parseFloat(value)
    .toFixed(2)
    .replace(",", ".");
  //return value.replace(",", ".");
}

// Formato de moeda em Br
function moneyBrFormat(value) {
  return parseFloat(value)
    .toFixed(2)
    .replace(".", ",");
  //   return new Intl.NumberFormat("pt-BR", {
  //     style: "currency",
  //     currency: "BRL"
  //   }).format(value);
}

function moneyBrMask(value = "") {
  //if (value === "") value = 0;

  return value.replace(".", ",");
}

export { dateBrFormat };
export { moneyUsFormat };
export { moneyBrFormat };
export { moneyBrMask };
