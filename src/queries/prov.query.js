const GET_ALL_PROVINSI = "SELECT * FROM provinsi";

const GET_PROVINSI_BY_ID = `SELECT P.*, JSON_AGG(JSON_BUILD_OBJECT('id', KK.id, 'nama', KK.nama)) as list_subarea
FROM provinsi P 
LEFT JOIN kabupaten_kota KK ON P.id = KK.id_prov
WHERE P.id = $1
GROUP BY P.id, P.nama, P.luas_area
`;

const CREATE_PROVINSI = "INSERT INTO provinsi (nama) VALUES ($1) RETURNING *";
const UPDATE_PROVINSI = "UPDATE provinsi SET nama = $2 WHERE id = $1 RETURNING *";
const DELETE_PROVINSI = "DELETE FROM provinsi WHERE id = $1 RETURNING *";

module.exports = {
  GET_ALL_PROVINSI,
  GET_PROVINSI_BY_ID,
  CREATE_PROVINSI,
  UPDATE_PROVINSI,
  DELETE_PROVINSI,
};
