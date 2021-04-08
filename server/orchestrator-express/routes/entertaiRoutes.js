const router = require("express").Router();
const EntertainMeCont = require("../controller/entertainmeCont");

router.get("/", EntertainMeCont.readAll);

module.exports = router;