const router = require("express").Router();
const { 
    users, 
    transporters, 
    vehicle,
  shipments,
  logStatus,
  logLoc } = require("../controllers");

router.get("/users", users.getDataUsers);
router.get("/users/:id", users.getDataUsersById);
router.post("/users/delete/:id", users.deleteDataUser);
router.post("/users", users.addDataUser);
router.post("/users/edit/:id", users.editDataUser);

router.get("/transporters", transporters.getDataTransporter);
router.get("/transporters/:id", transporters.getDataTransporterById);
router.post("/transporters/delete/:id", transporters.deleteDataTransporter);
router.post("/transporters", transporters.addDataTransporter);
router.post("/transporters/edit/:id", transporters.editDataTransporter);
router.get("/transporters/search/:id", transporters.searchDataTransporter);

router.get("/vehicle", vehicle.getDataVehicle);
router.get("/vehicle/:id", vehicle.getDataVehicleById);
router.post("/vehicle/delete/:id", vehicle.deleteDataVehicle);
router.post("/vehicle", vehicle.addDataVehicle);
router.post("/vehicle/edit/:id", vehicle.editDataVehicle);
router.get("/vehicle/search/:id", vehicle.searchDataVehicle);

router.get("/shipments", shipments.getDataShipments);
router.get("/shipments/:id", shipments.getDataShipmentsById);
router.post("/shipments/delete/:id", shipments.deleteDataShipments);
router.post("/shipments", shipments.addDataShipments);
router.post("/shipments/edit/:id", shipments.editDataShipments);
router.get("/shipments/search/:id", shipments.searchDataShipments);

router.get("/log-status", logStatus.getDataShipmentsLogStatus);
router.get("/log-status/:id", logStatus.getDataShipmentsLogStatusById);
router.post("/log-status/delete/:id", logStatus.deleteDataShipmentsLogStatus);
router.post("/log-status", logStatus.addDataShipmentsLogStatus);
router.post("/log-status/edit/:id", logStatus.editDataShipmentsLogStatus);

router.get("/log-loc", logLoc.getDataShipmentLogLoc);
router.get("/log-loc/:id", logLoc.getDataShipmentLogLocById);
router.post("/log-loc/delete/:id", logLoc.deleteDataShipmentLogLoc);
router.post("/log-loc", logLoc.addDataShipmentLogLoc);
router.post("/log-loc/edit/:id", logLoc.editDataShipmentLogLoc);

module.exports = router;
