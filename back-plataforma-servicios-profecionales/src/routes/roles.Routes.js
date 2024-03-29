const {Router} = require("express");
const router = Router();
const rolesControllers = require("../controllers/roles");
const adminMiddleware = require("../middlewares/adminMiddleware");

// router.get("/send",rolesControllers.send)
router.post("/uploadRol", adminMiddleware,rolesControllers.uploadRole);
router.get("/getRoles", adminMiddleware,rolesControllers.getRoles);
router.delete("/deleteRol", adminMiddleware,rolesControllers.deleteRol)

module.exports = router