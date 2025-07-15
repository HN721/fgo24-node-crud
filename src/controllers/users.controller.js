const {
  createUser,
  getAlluser,
  login,
  findByid,
  updateUser,
  deleteUser,
  forgotPassword,
  finduserEmail,
  checkToken,
  resetPassword,
} = require("../models/users.model");
const { constants: http } = require("http2");

exports.register = (req, res) => {
  const { email, password } = req.body;
  const found = finduserEmail(email);
  if (found) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "Email Already EXITS",
    });
  }
  const result = createUser(email, password);
  res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: result,
  });
};
exports.getAllusers = (req, res) => {
  const search = req.query.search ? req.query.search.toLowerCase() : "";
  const { page = 1, limit = 5 } = req.query;
  const pageInt = parseInt(page);
  const limitInt = parseInt(limit);

  const { data, totalData } = getAlluser(search, limit, page);
  res.status(201).json({
    success: true,
    message: "Sucess Get User",
    pageInfo: {
      page: pageInt,
      limit: limitInt,
      totalData,
      totalPage: Math.ceil(totalData / limit),
    },
    results: data,
  });
};
exports.loginCtrl = (req, res) => {
  const { email, password } = req.body;
  const rest = login(email, password);
  if (rest === `Wrong Email or Password`) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `Wrong Email or Password`,
    });
  } else {
    res.status(http.HTTP_STATUS_OK).json({
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
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: "User Not found",
    });
  }
  return res.status(http.HTTP_STATUS_OK).json({
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
    return res.status(http.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
      success: false,
      message: `cannot update users`,
    });
  }
  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: `Sucessfully Update User`,
    results: result,
  });
};
exports.deleteUsers = (req, res) => {
  const { id } = req.params;
  const result = deleteUser(id);
  if (!result) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `User Not Founds`,
    });
  }
  return res.status(http.HTTP_STATUS_OK).json({
    success: false,
    message: `Success Delete Users ${result.email}`,
  });
};
exports.forgotPasswords = (req, res) => {
  const { email } = req.body;
  const results = forgotPassword(email);

  if (!results) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `Email Not Founds`,
    });
  }
  return res.status(http.HTTP_STATUS_OK).json({
    success: true,
    message: `Your OTP ${results}`,
  });
};
exports.resetPasswords = (req, res) => {
  const { otp, newPassword } = req.body;
  const { id } = req.params;
  const response = checkToken(otp);
  if (!response) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `Wrong OTP ,Please Check ur Email`,
    });
  }
  const result = resetPassword(id, newPassword);
  if (!result) {
    return res.status(http.HTTP_STATUS_BAD_REQUEST).json({
      success: false,
      message: `User id with ${id} not found`,
    });
  }
  return res.status(http.HTTP_STATUS_ACCEPTED).json({
    success: true,
    message: `Successfully Reset Password`,
    results: result,
  });
};
