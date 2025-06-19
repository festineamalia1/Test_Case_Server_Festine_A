const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);
const bycript = require("bcrypt");

const md5 = require("md5");

pool.on("error", (err) => {
  console.log(err);
});

module.exports = {
  getDataShipmentLogLoc(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(`SELECT * FROM shipment_log_loc;`, function (error, results) {
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
  getDataShipmentLogLocById(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM shipment_log_loc WHERE id_log_loc = ?;`,
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

  addDataShipmentLogLoc(req, res) {
    // const hashPassword = bycript.hash(req.body.pass, 10);
    let data = {
      id_shipment: req.body.id_shipment,
      update_time: req.body.update_time,
      status: req.body.status,
        id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO shipment_log_loc SET ?;`,
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

  editDataShipmentLogLoc(req, res) {
    let id = req.params.id;
    let dataEdit = {
     id_shipment: req.body.id_shipment,
      update_time: req.body.update_time,
      status: req.body.status,
        id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE shipment_log_loc SET ? WHERE id_log_loc = ? ;`,
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

  deleteDataShipmentLogLoc(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM shipment_log_loc WHERE id_log_loc = ?;`,
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


};
