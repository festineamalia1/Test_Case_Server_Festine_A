const config = require("../configs/database");
const mysql = require("mysql");
const pool = mysql.createPool(config);
const bycript = require("bcrypt");

const md5 = require("md5");

pool.on("error", (err) => {
  console.log(err);
});

module.exports = {
  getDataTransporter(req, res) {
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(`SELECT * FROM transporter;`, function (error, results) {
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
  getDataTransporterById(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM transporter WHERE id_transporter = ?;`,
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

  addDataTransporter(req, res) {
    // const hashPassword = bycript.hash(req.body.pass, 10);
    let data = {
      nama: req.body.nama,
      phone: req.body.phone,
      available: req.body.available,
        id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `INSERT INTO transporter SET ?;`,
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

  editDataTransporter(req, res) {
    let id = req.params.id;
    let dataEdit = {
     nama: req.body.nama,
      phone: req.body.phone,
      available: req.body.available,
      id_user : req.body.id_user
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `UPDATE transporter SET ? WHERE id_transporter = ? ;`,
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

  deleteDataTransporter(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `DELETE FROM transporter WHERE id_transporter = ?;`,
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

  searchDataTransporter(req, res) {
    let id = req.params.id;
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query(
        `SELECT * FROM transporter WHERE nama LIKE ?;`,
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
