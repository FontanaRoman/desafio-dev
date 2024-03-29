const {Router} = require("express");
const router = Router();
const stateControllers = require("../controllers/state");
const adminMiddleware = require("../middlewares/adminMiddleware");
const userMiddleware = require("../middlewares/userMiddleware");
router.post("/uploadState", adminMiddleware,stateControllers.uploadState);
router.get("/getState", userMiddleware,stateControllers.getState);

module.exports = router