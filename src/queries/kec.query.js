const GET_ALL_KECAMATAN = "SELECT * FROM kecamatan";
const GET_KECAMATAN_BY_ID = `SELECT KC.*, KK.nama AS nama_parent FROM kecamatan KC 
JOIN kabupaten_kota KK ON KK.id = KC.id_kab
WHERE KC.id = $1`;

const CREATE_KECAMATAN = "INSERT INTO kecamatan (id_kab, nama, luas_area) VALUES ($1, $2, $3) RETURNING *"
const UPDATE_KECAMATAN = "UPDATE kecamatan SET id_kab = $2, nama = $3, luas_area = $4 WHERE id = $1 RETURNING *"
const DELETE_KECAMATAN = "DELETE FROM kecamatan WHERE id = $1 RETURNING *"

module.exports = {
  GET_ALL_KECAMATAN,
  GET_KECAMATAN_BY_ID,
  CREATE_KECAMATAN,
  UPDATE_KECAMATAN,
  DELETE_KECAMATAN
};
