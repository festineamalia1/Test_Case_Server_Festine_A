const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);
const bycript = require("bcrypt");

const md5 = require("md5");

pool.on("error", (err) => {
  console.log(err);
});

module.exports = {
  getDataShipments(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(`SELECT transporter.id_transporter, transporter.nama, transporter.phone, vehicle.id_vehicle,vehicle.plat,vehicle.jenis_kendaraan, shipments.loc_asal, shipments.loc_tujuan, shipments.create_time,  shipment_log_status.status, shipments.id_shipment FROM shipments 
 JOIN transporter ON transporter.id_transporter = shipments.id_transporter  
JOIN vehicle ON vehicle.id_vehicle = shipments.id_vehicle JOIN shipment_log_status ON shipment_log_status.id_shipment = shipments.id_shipment;`, function (error, results) {
        if (error) throw error;
        res.send({
          success: true,
          message: "Berhasil",
          data: results,
        });
      });
      connection.release();
    });
  },
  getDataShipmentsById(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT transporter.nama, transporter.phone, vehicle.plat,vehicle.jenis_kendaraan, shipments.loc_asal, shipments.loc_tujuan, shipments.create_time,  shipment_log_status.status, shipments.id_shipment FROM shipments 
 JOIN transporter ON transporter.id_transporter = shipments.id_transporter  
JOIN vehicle ON vehicle.id_vehicle = shipments.id_vehicle JOIN shipment_log_status ON shipment_log_status.id_shipment = shipments.id_shipment WHERE shipments.id_shipment = ?;`,
        [id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil",
            data: results,
          });
        }
      );
      connection.release();
    });
  },

  addDataShipments(req, res) {
    // const hashPassword = bycript.hash(req.body.pass, 10);
    let data = {
      loc_asal: req.body.loc_asal,
      loc_tujuan: req.body.loc_tujuan,
      id_transporter: req.body.id_transporter,
      id_vehicle: req.body.id_vehicle,
      create_time: req.body.create_time,
        id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO shipments SET ?;`,
        [data],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil",
            data: results,
          });
        }
      );
      connection.release();
    });
  },

  editDataShipments(req, res) {
    let id = req.params.id;
    let dataEdit = {
     loc_asal: req.body.loc_asal,
      loc_tujuan: req.body.loc_tujuan,
      id_transporter: req.body.id_transporter,
      id_vehicle: req.body.id_vehicle,
      create_time: req.body.create_time,
        id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE shipments SET ? WHERE id_shipment = ? ;`,
        [dataEdit, id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil",
            data: results,
          });
        }
      );
      connection.release();
    });
  },

  deleteDataShipments(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM shipments WHERE id_shipment = ?;`,
        [id],
        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil",
            data: results,
          });
        }
      );
      connection.release();
    });
  },

  searchDataShipments(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT transporter.id_transporter, transporter.nama, transporter.phone, vehicle.id_vehicle,vehicle.plat,vehicle.jenis_kendaraan, shipments.loc_asal, shipments.loc_tujuan, shipments.create_time,  shipment_log_status.status, shipments.id_shipment FROM shipments 
 JOIN transporter ON transporter.id_transporter = shipments.id_transporter  
JOIN vehicle ON vehicle.id_vehicle = shipments.id_vehicle JOIN shipment_log_status ON shipment_log_status.id_shipment = shipments.id_shipment WHERE transporter.id_transporter LIKE ?;`,
        [`%${id}%`],

        function (error, results) {
          if (error) throw error;
          res.send({
            success: true,
            message: "Berhasil",
            data: results,
          });
        }
      );
      connection.release();
    });
  },
};
