const pool = require("../config/db.config");
const query = require("../queries/kec.query");

const getAllKecamatan = async (req, res) => {
  try {
    const result = await pool.query(query.GET_ALL_KECAMATAN);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

const getKecamatanByID = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const result = await pool.query(query.GET_KECAMATAN_BY_ID, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: `Cannot found Kecamatan with ID ${id}` });
    }

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

const createKecamatan = async (req, res) => {
  const { id_kab, nama, luas_area } = req.body;

  try {
    if (isNaN(parseFloat(luas_area)))
      throw {
        message: "invalid input syntax for type float",
      };

    const result = await pool.query(query.CREATE_KECAMATAN, [
      parseInt(id_kab),
      nama,
      parseFloat(luas_area),
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
          "Invalid input for 'id_kab' field. Please provide a valid integer.",
      });
    } else if (error.message.includes("invalid input syntax for type float")) {
      res.status(400).json({
        message:
          "Invalid input for 'luas_area' field. Please provide a valid number.",
      });
    } else if (error.message.includes("violates foreign key constraint")) {
      res.status(422).json({
        message: `The referenced Kabupaten or Kota does not exist.`,
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

const updateKecamatan = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { id_kab, nama, luas_area } = req.body;

    const queryResult = await pool.query(query.GET_KECAMATAN_BY_ID, [id]);
    if (queryResult.rowCount === 0) {
      res.status(404).json({ message: `Cannot found Kecamatan with ID ${id}` });
    }

    if (isNaN(parseFloat(luas_area)))
      throw {
        message: "invalid input syntax for type float",
      };

    const result = await pool.query(query.UPDATE_KECAMATAN, [
      parseInt(id),
      parseInt(id_kab),
      nama,
      parseFloat(luas_area),
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
          "Invalid input for id or 'id_kab' field. Please provide a valid integer.",
      });
    } else if (error.message.includes("invalid input syntax for type float")) {
      res.status(400).json({
        message:
          "Invalid input for 'luas_area' field. Please provide a valid number.",
      });
    } else if (error.message.includes("violates foreign key constraint")) {
      res.status(422).json({
        message: `The referenced Kabupaten or Kota does not exist.`,
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

const deleteKecamatan = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const queryResult = await pool.query(query.GET_KECAMATAN_BY_ID, [id]);
    if (queryResult.rowCount === 0) {
      res.status(404).json({ message: `Cannot found Kecamatan with ID ${id}` });
    }

    const result = await pool.query(query.DELETE_KECAMATAN, [parseInt(id)]);
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
  getAllKecamatan,
  getKecamatanByID,
  createKecamatan,
  updateKecamatan,
  deleteKecamatan,
};
