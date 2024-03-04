const pool = require("../config/db.config");
const query = require("../queries/search.query");

const get = async (req, res) => {
  const squery = `%${req.params.squery}%`;

  try {
    const data = {};

    const provRes = await pool.query(query.GET_PROVINCE_BY_NAME, [squery]);
    data["provinsi"] = provRes.rows

    const kabKotaRes = await pool.query(query.GET_KABUPATEN_KOTA_BY_NAME, [squery]);
    data["kabupaten_kota"] = kabKotaRes.rows

    const kecRes = await pool.query(query.GET_KECAMATAN_BY_NAME, [squery]);
    data["kecamatan"] = kecRes.rows
    
    res.status(200).json(data);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get,
};
