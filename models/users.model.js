const user = [];

exports.createUser = (email, password) => {
  const emailFound = user.find((u) => u.email === email);
  if (emailFound) {
    return null;
  }

  const data = {
    id: Math.floor(Math.random() * 100 + 1),
    email,
    password,
  };
  user.push(data);
  console.log(user);
  return "Success Create user";
};
exports.getAlluser = () => {
  return user;
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
exports.updateUser = (id, email, password) => {
  const userId = parseInt(id);
  const found = user.findIndex((u) => u.id === userId);
  if (found === -1) {
    return null;
  }
  user[found] = {
    ...user[found],
    email,
    password,
  };
  return user[found];
};
