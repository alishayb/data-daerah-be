const { Router } = require("express");
const controller = require("../controller/kec.controller");

const router = Router();

router.get("/", controller.getAllKecamatan);
router.get("/:id", controller.getKecamatanByID);
router.post("/", controller.createKecamatan)
router.put("/:id", controller.updateKecamatan)
router.delete("/:id", controller.deleteKecamatan)

module.exports = router;
