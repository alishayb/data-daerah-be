const { Router } = require("express");
const controller = require("../controller/search.controller");

const router = Router();

router.get("/:squery", controller.get);

module.exports = router;
