const fs = require("fs");
const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const users = data.users;

exports.getAllUsers = (req, res) => {
  console.log(req.params);
  res.json(users);
};
exports.getUserById = (req, res) => {
  const id = +req.params.id;
  const userById = users.find((p) => p.id === id);
  console.log(req.params);
  res.json(userById);
};
exports.addUser = (req, res) => {
  console.log(req.body);
  users.push(req.body);
  res.json(req.body);
};
exports.replaceUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  users.splice(userIndex, 1, { ...req.body, id: id });
  res.status(201).json(req.body);
};
exports.updateUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const currentUser = users[userIndex];
  users.splice(userIndex, 1, { ...currentUser, ...req.body });
  res.status(201).json(req.body);
};
exports.deleteUser = (req, res) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((p) => p.id === id);
  const currentUser = users[userIndex];
  users.splice(userIndex, 1);
  res.status(201).json(currentUser);
};
