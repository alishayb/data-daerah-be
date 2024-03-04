const { Router } = require("express");
const controller = require("../controller/kabkota.controller");

const router = Router();

router.get("/", controller.getAllKabupatenKota);
router.get("/:id", controller.getKabupatenKotaByID);
router.post("/", controller.createKabupatenKota);
router.put("/:id", controller.updateKabupatenKota)
router.delete("/:id", controller.deleteKabupatenKota)

module.exports = router;
