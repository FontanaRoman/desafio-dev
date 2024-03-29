const {Router} = require("express");
const router = Router();
const hiringApplicationsControllers = require("../controllers/hiringApplications")
const userMiddleware = require("../middlewares/userMiddleware");

router.post("/newHiringApplications/:user_id/:professionals_id", userMiddleware, hiringApplicationsControllers.newHiringApplications);
router.get("/getUserContracts", userMiddleware, hiringApplicationsControllers.userContracts);
router.get("/getUserProfessional", userMiddleware, hiringApplicationsControllers.professionalContracts);


module.exports = router