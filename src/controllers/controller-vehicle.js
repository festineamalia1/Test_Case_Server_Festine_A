const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);
const bycript = require("bcrypt");

const md5 = require("md5");

pool.on("error", (err) => {
  console.log(err);
});

module.exports = {
  getDataVehicle(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(`SELECT * FROM vehicle;`, function (error, results) {
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
  getDataVehicleById(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM vehicle WHERE id_vehicle = ?;`,
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

  addDataVehicle(req, res) {
    // const hashPassword = bycript.hash(req.body.pass, 10);
    let data = {
      plat: req.body.nama,
      jenis_kendaraan: req.body.phone,
      id_transporter: req.body.available,
      condition: req.body.condition,
      id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO vehicle SET ?;`,
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

  editDataVehicle(req, res) {
    let id = req.params.id;
    let dataEdit = {
    plat: req.body.nama,
      jenis_kendaraan: req.body.phone,
      id_transporter: req.body.available,
      condition: req.body.condition,
      id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE vehicle SET ? WHERE id_vehicle = ? ;`,
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

  deleteDataVehicle(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM vehicle WHERE id_vehicle = ?;`,
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

  searchDataVehicle(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM transporter WHERE plat LIKE ?;`,
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
