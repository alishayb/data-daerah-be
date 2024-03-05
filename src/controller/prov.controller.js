const pool = require("../config/db.config");
const query = require("../queries/prov.query");

const getAllProvinsi = async (req, res) => {
  try {
    const result = await pool.query(query.GET_ALL_PROVINSI);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "An unexpected error occurred." });
  }
};

const getProvinsiByID = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const provResult = await pool.query(query.GET_PROVINSI_BY_ID, [id]);

    if (provResult.rowCount === 0) {
      res.status(404).json({ message: `Cannot found Provinsi with ID ${id}` });
    }

    const result = provResult.rows[0];

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

const createProvinsi = async (req, res) => {
  const { nama } = req.body;

  try {
    const result = await pool.query(query.CREATE_PROVINSI, [nama]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    if (error.message.includes("null value in column")) {
      res.status(400).json({
        message: `Field '${error.column}' is required and cannot be null.`,
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

const updateProvinsi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nama } = req.body;

    const provResult = await pool.query(query.GET_PROVINSI_BY_ID, [id]);

    if (provResult.rowCount === 0) {
      res.status(404).json({ message: `Cannot found Provinsi with ID ${id}` });
    }

    const result = await pool.query(query.UPDATE_PROVINSI, [id, nama]);
    res.status(200).json(result.rows[0]);
  } catch (error) {
    if (error.message.includes("invalid input syntax for type integer")) {
      res.status(400).json({
        message: "Invalid input for ID. Please provide a valid integer.",
      });
    } else if (error.message.includes("null value in column")) {
      res.status(400).json({
        message: `Field '${error.column}' is required and cannot be null.`,
      });
    } else {
      res.status(500).json({ message: "An unexpected error occurred." });
    }
  }
};

const deleteProvinsi = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const provResult = await pool.query(query.GET_PROVINSI_BY_ID, [id]);

    if (provResult.rowCount === 0) {
      res.status(404).json({ message: `Cannot found Provinsi with ID ${id}` });
    }

    const result = await pool.query(query.DELETE_PROVINSI, [id]);
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
  getAllProvinsi,
  getProvinsiByID,
  createProvinsi,
  deleteProvinsi,
  updateProvinsi,
};
