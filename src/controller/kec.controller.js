const pool = require("../config/db.config");
const query = require("../queries/kec.query");

const getAllKecamatan = async (req, res) => {
  try {
    const result = await pool.query(query.GET_ALL_KECAMATAN);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getKecamatanByID = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(query.GET_KECAMATAN_BY_ID, [id]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

const createKecamatan = async (req, res) => {
  const { id_kab, nama, luas_area } = req.body;

  try {
    const result = await pool.query(query.CREATE_KECAMATAN, [
      parseInt(id_kab),
      nama,
      parseFloat(luas_area),
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

const updateKecamatan = async (req, res) => {
  const id = parseInt(req.params.id);
  const { id_kab, nama, luas_area } = req.body;

  try {
    const result = await pool.query(query.UPDATE_KECAMATAN, [
      parseInt(id),
      parseInt(id_kab),
      nama,
      parseFloat(luas_area),
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

const deleteKecamatan = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(query.DELETE_KECAMATAN, [parseInt(id)]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllKecamatan,
  getKecamatanByID,
  createKecamatan,
  updateKecamatan,
  deleteKecamatan,
};
