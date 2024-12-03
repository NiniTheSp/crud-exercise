const controller = {};
const models = require("../models");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  let { username, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.create({
      username,
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin ? true : false,
    });
    res.redirect("/users");
  } catch (error) {
    console.error(error);
    res.status(500).send("Can't add user");
  }
}

controller.editUser = async (req, res) => {
  let { id, firstName, lastName, mobile, isAdmin } = req.body;
  try {
    await models.User.update(
      {
        firstName,
        lastName,
        mobile,
        isAdmin: isAdmin ? true : false,
      },
      { where: { id } }
    );
    res.send("User has been updated!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Can't update user");
  }
}

controller.deleteUser = async (req, res) => {
  try {
    await models.User.destroy({ where: { id: req.params.id } });
    res.send("User has been deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("Can't delete user");
  }
}

module.exports = controller;