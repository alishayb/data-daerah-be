const { Router } = require("express");
const controller = require("../controller/prov.controller");

const router = Router();

router.get("/", controller.getAllProvinsi);
router.get("/:id", controller.getProvinsiByID)
router.post("/", controller.createProvinsi)
router.put("/:id", controller.updateProvinsi)
router.delete("/:id", controller.deleteProvinsi)


module.exports = router;
