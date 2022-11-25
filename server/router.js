const express = require("express");
const router = express.Router();
const {
  postUser,
  loginUser,
  getUserConParametros,
} = require("./controllers/userController");
const {
  postPublication,
  deletePublication,
  getPublication,
} = require("./controllers/publicationController");

module.exports = () => {
  // User:
  router.post("/post-user", postUser);
  router.post("/login-user", loginUser);
  router.get("/get-user/:id/:email", getUserConParametros);

  // Publication:
  router.post("/post-publication", postPublication);
  router.get("/get-publication/:page?", getPublication);
  router.delete("/delete-publication/:id", deletePublication);

  return router;
};
