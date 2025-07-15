const {
  createUser,
  getAlluser,
  login,
  findByid,
  updateUser,
  deleteUser,
  forgotPassword,
  finduserEmail,
} = require("../models/users.model");
exports.register = (req, res) => {
  const { email, password } = req.body;
  const found = finduserEmail(email);
  if (found) {
    return res.status(400).json({
      success: false,
      message: "Email Already EXITS",
    });
  }
  const result = createUser(email, password);
  res.status(201).json({
    success: true,
    message: result,
  });
};
exports.getAllusers = (req, res) => {
  const search = req.query.search ? req.query.search.toLowerCase() : "";

  const result = getAlluser(search);
  res.status(201).json({
    success: true,
    message: "Sucess Get User",
    results: result,
  });
};
exports.loginCtrl = (req, res) => {
  const { email, password } = req.body;
  const rest = login(email, password);
  if (rest === `Wrong Email or Password`) {
    return res.status(400).json({
      success: false,
      message: `Wrong Email or Password`,
    });
  } else {
    res.status(201).json({
      success: true,
      message: "OK",
      results: rest,
    });
  }
};
exports.findUserByid = (req, res) => {
  const { id } = req.params;
  const result = findByid(id);
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "User Not found",
    });
  }
  return res.status(200).json({
    success: false,
    message: "Success Get detail User",
    results: result,
  });
};
exports.updateUsers = (req, res) => {
  const { fullname, phone } = req.body;
  const { id } = req.params;

  const result = updateUser(id, fullname, phone);
  if (!result) {
    return res.status(500).json({
      success: false,
      message: `cannot update users`,
    });
  }
  return res.status(200).json({
    success: true,
    message: `Sucessfully Update User`,
    results: result,
  });
};
exports.deleteUsers = (req, res) => {
  const { id } = req.params;
  const result = deleteUser(id);
  if (!result) {
    return res.status(400).json({
      success: false,
      message: `User Not Founds`,
    });
  }
  return res.status(200).json({
    success: false,
    message: `Success Delete Users ${result.email}`,
  });
};
exports.forgotPasswords = (req, res) => {
  const { email } = req.body;
  const results = forgotPassword(email);

  if (!results) {
    return res.status(400).json({
      success: false,
      message: `Email Not Founds`,
    });
  }
  return res.status(200).json({
    success: true,
    message: `Your OTP ${results}`,
  });
};
