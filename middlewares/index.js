const field_validation = require("../middlewares/field-validation");
const role_validation = require("../middlewares/role-validation");

module.exports = {
  ...field_validation,
  ...role_validation
}