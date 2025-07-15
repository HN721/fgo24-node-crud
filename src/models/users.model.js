const user = [
  {
    id: 1000,
    email: "hosea@gmail.com",
    password: "12345",
  },
];
const token = [];
exports.finduserEmail = (email) => {
  const emailFound = user.find((u) => u.email === email);
  if (emailFound) {
    return emailFound;
  }
  return null;
};

exports.createUser = (email, password) => {
  const data = {
    id: Math.floor(Math.random() * 100 + 1),
    email,
    password,
  };
  user.push(data);
  console.log(user);
  return "Success Create user";
};
exports.getAlluser = (search) => {
  const filteredData = user.filter((item) =>
    item.email.toLowerCase().includes(search)
  );
  if (filteredData) {
    return filteredData;
  } else {
    return user;
  }
};
exports.login = (email, password) => {
  const found = user.filter(
    (u) => u.email === email && u.password === password
  );
  if (found.length > 0) {
    return `Berhasil Login ${email}`;
  } else {
    return `Wrong Email or Password`;
  }
};
exports.findByid = (id) => {
  const userId = parseInt(id);
  const found = user.filter((u) => u.id === userId);
  console.log(found);
  if (found.length > 0) {
    return found;
  } else {
    return null;
  }
};
exports.updateUser = (id, fullname, phone) => {
  const userId = parseInt(id);
  const found = user.findIndex((u) => u.id === userId);
  if (found === -1) {
    return null;
  }
  user[found] = {
    ...user[found],
    fullname,
    phone,
  };
  return user[found];
};
exports.deleteUser = (id) => {
  const userId = parseInt(id);
  const found = user.findIndex((u) => u.id === userId);
  if (found === -1) {
    return null;
  } else {
    return user.splice(found, 1)[0];
  }
};
exports.forgotPassword = (email) => {
  const otp = generateToken();
  const emailFound = user.find((u) => u.email === email);
  if (emailFound) {
    console.log(otp);
    return otp;
  } else {
    return null;
  }
};

function generateToken() {
  const characters = "pqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
exports.resetPassword = newPassword = {};
