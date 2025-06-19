const users = require('./controller-users');
const transporters = require("./controller-transporters");
const vehicle = require("./controller-vehicle");
const shipments = require("./controller-shipments");
const logStatus = require("./controller-shipments-log-status");
const logLoc = require("./controller-shipments-log-loc");

module.exports = {
  users,
  transporters,
  vehicle,
  shipments,
  logStatus,
  logLoc
};