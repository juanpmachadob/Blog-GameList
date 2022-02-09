const field_validation = require("./field-validation");
const role_validation = require("./role-validation");
const jwt_validation = require("./jwt-validation")

module.exports = {
  ...field_validation,
  ...role_validation,
  ...jwt_validation
}