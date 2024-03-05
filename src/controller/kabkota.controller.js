const pool = require("../config/db.config");
const query = require("../queries/kabkota.query");

const getAllKabupatenKota = async (req, res) => {
  try {
    const result = await pool.query(query.GET_ALL_KABUPATEN_KOTA);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

const getKabupatenKotaByID = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const queryResult = await pool.query(query.GET_KABUPATEN_KOTA_BY_ID, [id]);

    if (queryResult.rowCount === 0) {
      res
        .status(404)
        .json({ message: `Cannot found Kabupaten or Kota with ID ${id}` });
    }

    const result = queryResult.rows[0];

    if (result?.list_subarea[0].id === null) {
      result.list_subarea = [];
    }

    res.status(200).json(result);
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      res.status(400).json({
        message: "Invalid input for ID. Please provide a valid integer.",
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
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
    if (error.message.includes("null value in column")) {
      res.status(400).json({
        message: `Field '${error.column}' is required and cannot be null.`,
      });
    } else if (
      error.message.includes("invalid input syntax for type integer")
    ) {
      res.status(400).json({
        message:
          "Invalid input for 'id_prov' field. Please provide a valid integer.",
      });
    } else if (error.message.includes("invalid input value for enum")) {
      res.status(400).json({
        message: `Invalid value for 'tipe' field. Accepted values are 'kabupaten' or 'kota'.`,
      });
    } else if (error.message.includes("violates foreign key constraint")) {
      res.status(422).json({
        message: `The referenced Provinsi does not exist.`,
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

const updateKabupatenKota = async (req, res) => {
  const id = parseInt(req.params.id);
  const { id_prov, nama, tipe } = req.body;

  try {
    const queryResult = await pool.query(query.GET_KABUPATEN_KOTA_BY_ID, [id]);

    if (queryResult.rowCount === 0) {
      res
        .status(404)
        .json({ message: `Cannot found Kabupaten or Kota with ID ${id}` });
    }

    const result = await pool.query(query.UPDATE_KABUPATEN_KOTA, [
      parseInt(id),
      parseInt(id_prov),
      nama,
      tipe,
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    if (error.message.includes("null value in column")) {
      res.status(400).json({
        message: `Field '${error.column}' is required and cannot be null.`,
      });
    } else if (
      error.message.includes("invalid input syntax for type integer")
    ) {
      res.status(400).json({
        message:
          "Invalid input for id or 'id_prov' field. Please provide a valid integer.",
      });
    } else if (error.message.includes("invalid input value for enum")) {
      res.status(400).json({
        message: `Invalid value for 'tipe' field. Accepted values are 'kabupaten' or 'kota'.`,
      });
    } else if (error.message.includes("violates foreign key constraint")) {
      res.status(422).json({
        message: `The referenced Provinsi does not exist.`,
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

const deleteKabupatenKota = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const queryResult = await pool.query(query.GET_KABUPATEN_KOTA_BY_ID, [id]);
    if (queryResult.rowCount === 0) {
      res
        .status(404)
        .json({ message: `Cannot found Kabupaten or Kota with ID ${id}` });
    }

    const result = await pool.query(query.DELETE_KABUPATEN_KOTA, [
      parseInt(id),
    ]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      res.status(400).json({
        message: "Invalid input for ID. Please provide a valid integer.",
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

module.exports = {
  getAllKabupatenKota,
  getKabupatenKotaByID,
  createKabupatenKota,
  updateKabupatenKota,
  deleteKabupatenKota,
};
