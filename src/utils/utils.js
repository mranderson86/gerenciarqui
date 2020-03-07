import moment from "moment";

// Data no formato BR
function dateBrFormat(date = "") {
  return moment(date).format("DD/MM/YYYY");
}

export { dateBrFormat };
