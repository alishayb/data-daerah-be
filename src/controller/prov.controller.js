const pool = require("../config/db.config");
const query = require("../queries/prov.query");

const getAllProvinsi = async (req, res) => {
  try {
    const result = await pool.query(query.GET_ALL_PROVINSI);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getProvinsiByID = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const provResult = await pool.query(query.GET_PROVINSI_BY_ID, [id]);
    const result = provResult.rows[0];

    if (result?.list_subarea[0].id === null) {
      result.list_subarea = [];
    }

    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

const createProvinsi = async (req, res) => {
  const { nama } = req.body;

  try {
    const result = await pool.query(query.CREATE_PROVINSI, [nama]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

const updateProvinsi = async (req, res) => {
  const id = parseInt(req.params.id);
  const { nama } = req.body;

  try {
    const result = await pool.query(query.UPDATE_PROVINSI, [id, nama]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

const deleteProvinsi = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(query.DELETE_PROVINSI, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllProvinsi,
  getProvinsiByID,
  createProvinsi,
  deleteProvinsi,
  updateProvinsi,
};
