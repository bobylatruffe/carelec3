const fs = require("fs");
const path = require("path");
const clError = require("./error")

const pathClients = path.join(__dirname, "../../data/clients");

module.exports = {fs, path, clError, pathClients}