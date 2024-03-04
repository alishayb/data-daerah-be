GET_ALL_KABUPATEN_KOTA = "SELECT * FROM kabupaten_kota";

GET_KABUPATEN_KOTA_BY_ID = `SELECT KK.*, P.nama as nama_parent, JSON_AGG(JSON_BUILD_OBJECT('id', KC.id, 'nama', KC.nama)) as list_subarea
FROM kabupaten_kota KK 
JOIN provinsi P ON P.id = KK.id_prov
LEFT JOIN kecamatan KC ON KK.id = KC.id_kab
WHERE KK.id = $1
GROUP BY KK.id, KK.nama, KK.luas_area, P.nama`;

const CREATE_KABUPATEN_KOTA = "INSERT INTO kabupaten_kota (id_prov, nama, tipe) VALUES ($1, $2, $3) RETURNING *"
const UPDATE_KABUPATEN_KOTA = "UPDATE kabupaten_kota SET id_prov = $2, nama = $3, tipe = $4 WHERE id = $1 RETURNING *"
const DELETE_KABUPATEN_KOTA = "DELETE FROM kabupaten_kota WHERE id = $1 RETURNING *"

module.exports = {
  GET_ALL_KABUPATEN_KOTA,
  GET_KABUPATEN_KOTA_BY_ID,
  CREATE_KABUPATEN_KOTA,
  UPDATE_KABUPATEN_KOTA,
  DELETE_KABUPATEN_KOTA
};
