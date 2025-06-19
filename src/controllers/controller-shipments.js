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
      connection.query(`SELECT * FROM shipments;`, function (error, results) {
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
        `SELECT * FROM shipments WHERE id_shipment = ?;`,
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
        `SELECT * FROM shipments WHERE id_transporter LIKE ?;`,
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
