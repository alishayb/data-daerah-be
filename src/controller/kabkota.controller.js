const pool = require("../config/db.config");
const query = require("../queries/kabkota.query");

const getAllKabupatenKota = async (req, res) => {
  try {
    const result = await pool.query(query.GET_ALL_KABUPATEN_KOTA);
    res.status(200).json(result.rows);
  } catch (error) {
    throw error;
  }
};

const getKabupatenKotaByID = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const provinceResult = await pool.query(query.GET_KABUPATEN_KOTA_BY_ID, [
      id,
    ]);
    const result = provinceResult.rows[0];

    if (result?.list_subarea[0].id === null) {
      result.list_subarea = [];
    }

    res.status(200).json(result);
  } catch (error) {
    throw error;
  }
};

const createKabupatenKota = async (req, res) => {
  const { id_prov, nama, tipe } = req.body;

  try {
    const result = await pool.query(query.CREATE_KABUPATEN_KOTA, [
      parseInt(id_prov),
      nama,
      tipe,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

const updateKabupatenKota = async (req, res) => {
  const id = parseInt(req.params.id);
  const { id_prov, nama, tipe } = req.body;

  try {
    const result = await pool.query(query.UPDATE_KABUPATEN_KOTA, [
      parseInt(id),
      parseInt(id_prov),
      nama,
      tipe,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

const deleteKabupatenKota = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(query.DELETE_KABUPATEN_KOTA, [
      parseInt(id),
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllKabupatenKota,
  getKabupatenKotaByID,
  createKabupatenKota,
  updateKabupatenKota,
  deleteKabupatenKota,
};
