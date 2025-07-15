const {
  createUser,
  getAlluser,
  login,
  findByid,
  updateUser,
  deleteUser,
} = require("../models/users.model");
exports.register = (req, res) => {
  const { email, password } = req.body;
  const result = createUser(email, password);
  if (!result) {
    return res.status(400).json({
      success: false,
      message: "Email Already EXITS",
    });
  }

  res.status(201).json({
    success: true,
    message: result,
  });
};
exports.getAllusers = (req, res) => {
  const result = getAlluser();
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
  const { email, password } = req.body;
  const { id } = req.params;

  if (!email && !password) {
    return res.status(400).json({
      success: false,
      message: `email,password cannot empty`,
    });
  }
  const result = updateUser(id, email, password);
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
